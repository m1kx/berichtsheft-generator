import { Workbook, type Row, type Worksheet } from "exceljs";

export const createDefaultSheet = (workbook: Workbook): Worksheet => {
  const sheet = workbook.addWorksheet('Data');

  sheet.properties.defaultRowHeight = 60;
  sheet.columns = [
    { header: 'Woche', key: 'week', width: 20 },
    { header: 'Betriebliche Tätigket', key: 'activity', width: 100 },
    { header: 'Unterweisungen, betrieblicher Unterricht, sonstige Schulungen', key: 'other', width: 100 },
  ]

  return sheet;
}

export const addWeeklyRow = (worksheet: Worksheet, timeRange: string, activity: string, existingDateRangeIndex: number, other?: string) => {
  const rowValue = [timeRange, activity, other];
  let addedRow: Row;
  if (existingDateRangeIndex === -1) {
    addedRow = worksheet.addRow(rowValue);
  } else {
    worksheet.spliceRows(existingDateRangeIndex, 1);
    addedRow = worksheet.insertRow(existingDateRangeIndex, rowValue);
  }
  addedRow.height = Math.max(activity.split('\n').length * 13, timeRange.split('\n').length * 13);
  addedRow.alignment = {
    vertical: 'top',
    wrapText: true,
  };
  addedRow.commit();
}