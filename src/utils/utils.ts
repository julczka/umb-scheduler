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

export const MILISECONDS = {
  HOUR: 1000 * 60 * 60,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  TWO_WEEKS: 2 * 7 * 24 * 60 * 60 * 1000,
  MONTH: 5 * 7 * 24 * 60 * 60 * 1000,
  QUATER: 4 * 5 * 7 * 24 * 60 * 60 * 1000,
  HALF_YEAR: 6 * 5 * 7 * 24 * 60 * 60 * 1000,
  YEAR: 12 * 5 * 7 * 24 * 60 * 60 * 1000,
};

export const deltaDates = (dateA: Date, dateB: Date) =>
  dateA.valueOf() - dateB.valueOf();

export const deltaDatesRange = (startDate: Date, endDate: Date) => {
  const delta = deltaDates(endDate, startDate);
  let range;
  for (const [key, value] of Object.entries(MILISECONDS)) {
    if (delta < value) {
      range = key;
      break;
    }
    range = 'YEAR';
  }
  return range;
};

console.log(deltaDatesRange(new Date('2021-06-01'), new Date('2021-12-27')));

export const checkIfTheSameDay = (startDate: Date, endDate: Date) => {
  if (endDate < startDate) throw new Error('you cannot end before you start!');
  if (deltaDates(endDate, startDate) < MILISECONDS.DAY) return true;
  return false;
};

export const checkIfEqualDates = (startDate: Date, endDate: Date) => {
  if (endDate.valueOf() === startDate.valueOf()) return true;
  return false;
};
