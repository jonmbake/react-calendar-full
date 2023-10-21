import { ISO8601TimeString } from "../types/ISO8601";

export function formatHour(hour: number) {
  return hour === 12
    ? "12 PM"
    : hour === 0
    ? "12 AM"
    : hour > 12
    ? `${hour - 12} PM`
    : `${hour} AM`;
}

export function calculateMinutesSinceMidnight(
  timeStr: ISO8601TimeString,
): number {
  const [hours, minutes] = timeStr.split(":").map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time format");
  }

  return hours * 60 + minutes;
}
