import { ISO8601DateString, ISO8601TimeString } from "./types/ISO8601";

export type CalendarEvent = {
  id: number;
  description: string;
  date: ISO8601DateString;
  startTime: ISO8601TimeString;
  endTime: ISO8601TimeString;
};

class CalendarEventStore {
  events: Array<CalendarEvent>;

  constructor(events: Array<CalendarEvent>) {
    this.events = events;
  }

  public add(event: CalendarEvent) {
    this.events = [...this.events, event];
  }
}

export default CalendarEventStore;
