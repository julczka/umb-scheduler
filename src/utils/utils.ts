export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

export const checkIfTheSameDay = (startDate: Date, endDate: Date) => {
  if (endDate < startDate) throw new Error('you cannot end before you start!');
  const deltaDates = endDate.valueOf() - startDate.valueOf();
  const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
  if (deltaDates < DAY_IN_MILISECONDS) return true;
  return false;
};

export const checkIfEqualDates = (startDate: Date, endDate: Date) => {
  if (endDate.valueOf() === startDate.valueOf()) return true;
  return false;
};
