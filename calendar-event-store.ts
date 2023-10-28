import { ISO8601DateString, ISO8601TimeString } from "./types/ISO8601";

export type CalendarEvent = {
  id?: number;
  description: string;
  date: ISO8601DateString;
  startTime: ISO8601TimeString;
  endTime: ISO8601TimeString;
};

type CalendarEventListener = (event: CalendarEvent) => void;

export class CalendarEventStore {
  public events: Array<CalendarEvent> = [];
  private addListeners: Array<CalendarEventListener> = [];
  private updateListeners: Array<CalendarEventListener> = [];
  private deleteListeners: Array<CalendarEventListener> = [];

  constructor(events: Array<CalendarEvent>) {
    this.events = events;
  }

  public add(event: CalendarEvent): void {
    this.events = [...this.events, event];
    this.notify(this.addListeners, event);
  }

  public addOrUpdate(event: CalendarEvent): void {
    if (event.id == null) {
      event.id = Math.max(...this.events.map((event) => event.id || 0)) + 1;
      this.add(event);
    } else {
      const index = this.events.findIndex((e) => e.id === event.id);
      if (index !== -1) {
        this.events[index] = event;
        this.notify(this.updateListeners, event);
      } else {
        this.add(event);
      }
    }
  }

  public delete(eventId: number): void {
    const event = this.events.find((event) => event.id !== eventId);
    this.events = this.events.filter((event) => event.id !== eventId);
    if (event) {
      this.notify(this.deleteListeners, event);
    }
  }

  public onAdd(listener: CalendarEventListener): void {
    this.addListeners.push(listener);
  }

  public onUpdate(listener: CalendarEventListener): void {
    this.updateListeners.push(listener);
  }

  public onDelete(listener: CalendarEventListener): void {
    this.deleteListeners.push(listener);
  }

  private notify(
    listeners: Array<CalendarEventListener>,
    item: CalendarEvent,
  ): void {
    listeners.forEach((listener) => listener(item));
  }
}

export default CalendarEventStore;
