export const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export const formatDate = (date: Date): string => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export const formatDateRange = (dateStart: Date, dateEnd: Date, noNewline?: boolean): string => {
  return `Woche von${noNewline ? ' ' : '\n'}${formatDate(dateStart)}${noNewline ? ' ' : '\n'}bis${noNewline ? ' ' : '\n'}${formatDate(dateEnd)}`;
}

export interface Week {
  from: Date;
  to: Date;
}

export const getCurrentWeek = (): Week => {
  const from = new Date();
  from.setDate(from.getDate() - from.getDay());
  from.setHours(0, 0, 0, 0);
  const to = new Date();
  return {
    from,
    to,
  }
}

export const getTodaysDate = (): Week => {
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  const to = new Date();
  return {
    from,
    to,
  }
}

export const getLastWeeks = (amount: number): Week[] => {
  const lastWeeks = [];

  const now = new Date();
  const currentWeekStartDate = new Date();
  currentWeekStartDate.setDate(now.getDate() - (now.getDay() - 1) - 7);
  currentWeekStartDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < amount; i++) {
    const from = new Date();
    from.setDate(currentWeekStartDate.getDate() - 7 * i);
    from.setHours(0, 0, 0, 0);
    const to = new Date();
    to.setMonth(from.getMonth());
    to.setDate(from.getDate() + 4);
    to.setHours(23, 0, 0, 0);
    const week: Week = {
      from,
      to,
    }
    lastWeeks.push(week);
  }
  return lastWeeks;
}