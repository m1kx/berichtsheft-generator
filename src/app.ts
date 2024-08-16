import { Workbook, type Worksheet } from 'exceljs';
import { getWorkBookName, saveWorkbook } from './util/workbook.js';
import { setupHeadline } from './util/headline.js';
import { createDefaultSheet, addWeeklyRow } from './util/sheet.js';
import { getAllPullRequestsFromUserInTimeRange } from './util/bitbucket.js';
import { formatPullRequest } from './util/pullrequest.js';
import { dayNames, formatDateRange, getCurrentWeek, getLastWeeks, getTodaysDate } from './util/date';
import { select } from '@inquirer/prompts';
import { getTicketActivity } from './util/ollama';
import type { PullRequestActivity } from './types/bitbucket';

let worksheet: Worksheet;
let workbookName: string;

const run = async () => {

  //const ticketActivity = getTicketActivity();

  //console.log(`Aktivität:\n${activity}`)

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

  const lastWeeks = getLastWeeks(5);

  const answer = await select({
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
  })

  const formattedDateRange = formatDateRange(answer.from, answer.to);

  const existingDateRangeIndex = worksheet.getRows(0, worksheet.rowCount + 1)?.findIndex(row => row.getCell(1).value?.toString().split('bis')[0] === formattedDateRange.split('bis')[0]) || -1;

  const pullRequestsThisWeek = await getAllPullRequestsFromUserInTimeRange(answer.from, answer.to);

  const pullRequestWithActivity: PullRequestActivity[] = [];
  for (const pr of pullRequestsThisWeek) {
    const ticketId = pr.fromRef.displayId.split('-').slice(0,2).join('-');
    console.log(ticketId)
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