import { Workbook, type Worksheet } from 'exceljs';
import { getWorkBookName, saveWorkbook } from './util/workbook.js';
import { setupHeadline } from './util/headline.js';
import { createDefaultSheet, addWeeklyRow } from './util/sheet.js';
import { getAllPullRequestsFromUserInTimeRange } from './util/bitbucket.js';
import { formatPullRequest, isPullRequestInTimeRange, isPullRequestUpdateInTimeRange } from './util/pullrequest.js';
import { dayNames, formatDateRange, getCurrentWeek, getLastWeeks, getTodaysDate } from './util/date';
import { select } from '@inquirer/prompts';
import { getTicketActivity } from './util/ollama';
import type { PullRequest, PullRequestActivity } from './types/bitbucket';
import { getTicketHeading } from './util/jira.js';
import { loadConfig } from './util/config.js';

let worksheet: Worksheet;
let workbookName: string;

const config = loadConfig();

const run = async () => {
  const lastWeeks = getLastWeeks(5);

  const forBerichtsheft = await select({
    message: 'Wofür soll dieses script verwendet werden?',
    choices: [{
      name: 'Berichtsheft',
      value: true
    }, {
      name: 'Checkout Message',
      value: false
    }]
  })

  const answer = forBerichtsheft ? await select({
    message: 'Welches Datum soll verwendet werden?',
    choices: [{
      name: 'Aktuelle Woche',
      value: getCurrentWeek(),
    }, {
      name: 'Nur heutiges Datum',
      value: getTodaysDate(),
    }].concat(lastWeeks.map(week => {
      return {
        name: formatDateRange(week.from, week.to, true),
        value: week
      }
    }))
  }) : {
    from: new Date('1970-01-01'),
    to: new Date()
  }

  const formattedDateRange = formatDateRange(answer.from, answer.to);

  const pullRequestsInTimeFrame: PullRequest[] = [];
  for (const repo of config.repos) {
    const prs = await getAllPullRequestsFromUserInTimeRange(answer.from, answer.to, repo);
    pullRequestsInTimeFrame.push(...prs);
  }

  if (!forBerichtsheft) {
    const today = getTodaysDate();

    console.log(pullRequestsInTimeFrame.filter(pr => pr.title.includes('change s3 map logic')))

    console.log(pullRequestsInTimeFrame.length)
    const mergesToday = pullRequestsInTimeFrame.filter(pr => pr.closed && pr.state === 'MERGED' && pr.closedDate && isPullRequestUpdateInTimeRange(today.from, today.to, pr));
    let message = '';
    for (const merge of mergesToday) {
      const ticketId = merge.fromRef.displayId.split('/')[merge.fromRef.displayId.split('/').length - 1]!.split('-').slice(0, 2).join('-');
      const ticketHeading = await getTicketHeading(ticketId)
      message += ` - ${ticketId}: ${ticketHeading} :merge:\n`;
    }

    const prsToday = pullRequestsInTimeFrame.filter(pr => pr.state === 'OPEN' && isPullRequestInTimeRange(today.from, today.to, pr))
    for (const pr of prsToday) {
      const ticketId = pr.fromRef.displayId.split('/')[pr.fromRef.displayId.split('/').length - 1]!.split('-').slice(0, 2).join('-');
      const ticketHeading = await getTicketHeading(ticketId)
      message += ` - ${ticketId}: ${ticketHeading} :pullrequest:\n`;
    }

    const prUpdatesToday = pullRequestsInTimeFrame.filter(pr => pr.state === 'OPEN' && isPullRequestUpdateInTimeRange(today.from, today.to, pr));
    for (const pr of prUpdatesToday) {
      if (prsToday.find(prT => prT.id === pr.id)) {
        continue;
      }
      const ticketId = pr.fromRef.displayId.split('/')[pr.fromRef.displayId.split('/').length - 1]!.split('-').slice(0, 2).join('-');
      const ticketHeading = await getTicketHeading(ticketId)
      message += ` - ${ticketId}: ${ticketHeading} :pullrequest: :building_construction:\n`;
    }

    console.log(message)
    return;
  }

  workbookName = getWorkBookName();
  const workbook = new Workbook();
  try {
    await workbook.xlsx.readFile(workbookName);
  } catch {
    workbook.creator = 'script';
  }

  const dataSheet = workbook.getWorksheet('Data');
  if (!dataSheet) {
    worksheet = createDefaultSheet(workbook);
    setupHeadline(worksheet);
  } else {
    worksheet = dataSheet;
  }
  const existingDateRangeIndex = worksheet.getRows(0, worksheet.rowCount + 1)?.findIndex(row => row.getCell(1).value?.toString().split('bis')[0] === formattedDateRange.split('bis')[0]) || -1;

  const pullRequestWithActivity: PullRequestActivity[] = [];
  for (const pr of pullRequestsInTimeFrame) {
    const ticketId = pr.fromRef.displayId.split('-').slice(0, 2).join('-');
    const ticketActivity = await getTicketActivity(ticketId);
    pullRequestWithActivity.push({
      title: formatPullRequest(pr),
      aiDescription: ticketActivity
    });
  };

  pullRequestWithActivity.sort((a: PullRequestActivity, b: PullRequestActivity) => {
    const dayStringA = a.title.split('[')[1]!.split(']')[0];
    const dayIndexA = dayNames.findIndex(day => day === dayStringA);
    const dayStringB = b.title.split('[')[1]!.split(']')[0];
    const dayIndexB = dayNames.findIndex(day => day === dayStringB);
    return dayIndexA < dayIndexB ? -1 : 1;
  });

  addWeeklyRow(worksheet, formattedDateRange, pullRequestWithActivity.map(pr => `${pr.title}\n${pr.aiDescription}`).join('\n\n'), existingDateRangeIndex);

  workbook.modified = new Date();
  await saveWorkbook(workbook, workbookName)
}

run();
