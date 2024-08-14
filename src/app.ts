import { Workbook, type Worksheet } from 'exceljs';
import { getWorkBookName, saveWorkbook } from './util/workbook';
import { setupHeadline } from './util/headline';
import { createDefaultSheet, addWeeklyRow } from './util/sheet';
import { getAllPullRequestsFromUserInTimeRange } from './util/bitbucket';
import { formatPullRequest } from './util/pullrequest';
import { dayNames, formatDateRange, getCurrentWeek, getLastWeeks, getTodaysDate } from './util/date';
import { select } from '@inquirer/prompts';

let worksheet: Worksheet;
let workbookName: string;

const run = async () => {
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

  const existingDateRangeIndex = worksheet.getRows(0, worksheet.rowCount + 1)?.findIndex(row => row.getCell(1).value === formattedDateRange) || -1;

  const pullRequestsThisWeek = await getAllPullRequestsFromUserInTimeRange(answer.from, answer.to);

  const formattedPullRequestTexts: string[] = [];
  pullRequestsThisWeek.forEach(pr => {
    formattedPullRequestTexts.push(formatPullRequest(pr));
  });

  formattedPullRequestTexts.sort((a: string, b: string) => {
    const dayStringA = a.split('[')[1]!.split(']')[0];
    const dayIndexA = dayNames.findIndex(day => day === dayStringA);
    const dayStringB = b.split('[')[1]!.split(']')[0];
    const dayIndexB = dayNames.findIndex(day => day === dayStringB);
    return dayIndexA < dayIndexB ? -1 : 1;
  });

  console.log('Folgende Einträge wurden in Excel hinzugefügt:');
  console.log(formattedPullRequestTexts);

  addWeeklyRow(worksheet, formattedDateRange, formattedPullRequestTexts.join('\n'), existingDateRangeIndex);

  workbook.modified = new Date();
  await saveWorkbook(workbook, workbookName)
}

run();