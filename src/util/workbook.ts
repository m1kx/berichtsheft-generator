import { Workbook } from "exceljs";

export const getWorkBookName = (): string => {
  const now = new Date();
  const formattedName = `berichtsheft-${now.getFullYear()}.xlsx`;
  return formattedName;
}

export const saveWorkbook = async (workbook: Workbook, location: string) => {
  await workbook.xlsx.writeFile(location);
  return true;
}