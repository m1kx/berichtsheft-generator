import type { Worksheet } from "exceljs";

export const setupHeadline = (sheet: Worksheet) => {
  const headlines = sheet.getRow(1);

  headlines.height = 17;
  headlines.font = {
    size: 20,
    bold: true
  }

  headlines.commit();
}