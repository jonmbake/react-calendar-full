import { ISO8601DateString, ISO8601TimeString } from "./types/ISO8601";

export type CalendarEvent = {
  id?: number;
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

  public addOrUpdate(event: CalendarEvent) {
    if (event.id == null) {
      event.id = Math.max(...this.events.map((event) => event.id || 0)) + 1;
      this.events.push(event);
      return;
    }

    const index = this.events.findIndex((e) => e.id === event.id);

    if (index !== -1) {
      this.events[index] = event;
    } else {
      this.add(event);
    }
  }
}

export default CalendarEventStore;
