export type ISO8601DateString = string & { _iso8601DateBrand?: never };
export type ISO8601TimeString = string & { _iso8601DateBrand?: never };

export function isISO8601Date(
  dateString: string,
): dateString is ISO8601DateString {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
  return iso8601Regex.test(dateString);
}

export function isISO8601Time(
  timeString: string,
): timeString is ISO8601TimeString {
  const iso8601Regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
  return iso8601Regex.test(timeString);
}
