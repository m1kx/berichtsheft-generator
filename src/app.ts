import { Workbook, type Worksheet } from 'exceljs';
import { getWorkBookName, saveWorkbook } from './util/workbook';
import { setupHeadline } from './util/headline';
import { createDefaultSheet, addWeeklyRow } from './util/sheet';
import { getAllPullRequestsFromUserInTimeRange } from './util/bitbucket';
import { formatPullRequest } from './util/pullrequest';
import { formatDateRange } from './util/date';

let worksheet: Worksheet;
let workbookName: string;

const run = async () => {
  workbookName = getWorkBookName();
  const workbook = new Workbook();
  try {
    await workbook.xlsx.readFile(workbookName);
  } catch (e) {
    workbook.creator = 'script';
  }

  const dataSheet = workbook.getWorksheet('Data');
  if (!dataSheet) {
    worksheet = createDefaultSheet(workbook);
    setupHeadline(worksheet);
  } else {
    worksheet = dataSheet;
  }


  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  const weekEnd = new Date();
  weekEnd.setDate(weekStart.getDate() + (7 - weekStart.getDay()))

  const formattedDateRange = formatDateRange(weekStart, weekEnd);

  const existingDateRangeIndex = worksheet.getRows(0, worksheet.rowCount + 1)?.findIndex(row => row.getCell(1).value === formattedDateRange) || -1;

  const pullRequestsThisWeek = await getAllPullRequestsFromUserInTimeRange(weekStart, weekEnd);

  const formattedPullRequestTexts: string[] = [];
  pullRequestsThisWeek.forEach(pr => {
    formattedPullRequestTexts.push(formatPullRequest(pr));
  });

  formattedPullRequestTexts.reverse();

  addWeeklyRow(worksheet, formattedDateRange, formattedPullRequestTexts.join('\n'), existingDateRangeIndex);

  workbook.modified = new Date();
  await saveWorkbook(workbook, workbookName)
}

run();

/*workbook.creator = 'script';
workbook.modified = new Date();

const sheet = createDefaultSheet(workbook);

setupHeadline(sheet);

const row: RowEntry = {
  week: new Date(),
  activity: 'Pull Request...\n2. Pull Request...',
  other: 'Andere aktivitäten'
}

const addedRow = sheet.addRow(row)
addedRow.height = 60;
addedRow.commit();

saveWorkbook(workbook, getWorkBookName())*/