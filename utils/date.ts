export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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