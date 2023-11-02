import { ISO8601TimeString } from '../types/ISO8601';

export function formatHour(hour: number) {
  return hour === 12
    ? '12 PM'
    : hour === 0
    ? '12 AM'
    : hour > 12
    ? `${hour - 12} PM`
    : `${hour} AM`;
}

export function calculateMinutesSinceMidnight(
  timeStr: ISO8601TimeString,
): number {
  const [hours, minutes] = timeStr.split(':').map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time format');
  }

  return hours * 60 + minutes;
}

export function formatTimeToHHmm(hours: number, minutes: number): string {
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time values');
  }

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
}

export function minutesSinceMidnightToHHmm(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours.toString().padStart(2, '0')}:${remainingMinutes
    .toString()
    .padStart(2, '0')}`;
}

export function roundToNearest15(minutes: number) {
  return Math.round(minutes / 15) * 15;
}
