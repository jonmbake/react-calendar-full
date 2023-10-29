export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const daysOfWeekShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type DateInfo = {
  dayOfWeek: string;
  month: string;
  startOfWeek: Date;
  endOfWeek: Date;
  dayOfMonth: number;
  year: number;
};

export function getDateInfo(inputDate: Date): DateInfo {
  const dayOfWeek = daysOfWeek[inputDate.getDay()];
  const month = monthsOfYear[inputDate.getMonth()];
  const dayOfMonth = inputDate.getDate();
  const year = inputDate.getFullYear();

  let startOfWeek = new Date(inputDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return {
    dayOfWeek,
    month,
    startOfWeek,
    endOfWeek,
    dayOfMonth,
    year,
  };
}

export function moveDate(date: Date, amount: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + amount);
  return nextDate;
}

export function moveMonth(date: Date, amount: number): Date {
  let newDate = new Date(date);
  newDate.setMonth(date.getMonth() + amount);
  return newDate;
}

export function startOfWeek(date: Date): Date {
  let startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  return startOfWeek;
}

export function datesOfWeek(date: Date): Array<Date> {
  let currentDate = startOfWeek(date);
  const datesOfWeek: Array<Date> = [];
  Array(7)
    .fill(null)
    .forEach(() => {
      datesOfWeek.push(currentDate);
      currentDate = moveDate(currentDate, 1);
    });
  return datesOfWeek;
}

export function areDatesEqual(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so +1 is needed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
