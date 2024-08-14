export const formatDate = (date: Date): string => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export const formatDateRange = (dateStart: Date, dateEnd: Date): string => {
  return `Woche von\n${formatDate(dateStart)}\nbis\n${formatDate(dateEnd)}`;
}