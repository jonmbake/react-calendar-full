import { useState } from "react";
import CalendarEventStore, { CalendarEvent } from "../calendar-event-store";
import {
  areDatesEqual,
  daysOfWeekShort,
  formatDateToYYYYMMDD,
} from "../utils/date";
import { minutesSinceMidnightToHHmm, roundToNearest15 } from "../utils/time";
import CalendarEventsForDate from "./calendar-events-for-date";
import EventModal from "./event-modal";

export interface Props {
  date: Date;
  dayStartTime: number;
  dayEndTime: number;
  eventStore: CalendarEventStore;
}

const DayColumn = ({ date, dayStartTime, dayEndTime, eventStore }: Props) => {
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null);

  const numberOfHoursBetweenDayStartEnd = dayEndTime - dayStartTime;

  return (
    <div className="d-flex flex-column date-col col day-col">
      <div
        className={
          "day-header" +
          (areDatesEqual(date, new Date()) ? " bg-dark-subtle" : "")
        }
      >
        <strong>{date.getDate()}</strong> {daysOfWeekShort[date.getDay()]}
      </div>
      <div
        className="event-col border"
        style={{ height: `${60 * numberOfHoursBetweenDayStartEnd}px` }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          setModalEvent({
            date: formatDateToYYYYMMDD(date),
            description: "",
            startTime: minutesSinceMidnightToHHmm(
              roundToNearest15(dayStartTime * 60 + e.nativeEvent.offsetY),
            ),
            endTime: minutesSinceMidnightToHHmm(
              roundToNearest15(dayStartTime * 60 + e.nativeEvent.offsetY + 60),
            ),
          });
        }}
      >
        <CalendarEventsForDate
          dayStartTime={dayStartTime}
          events={eventStore.eventsForDate(date)}
          onClick={(event: CalendarEvent) => setModalEvent(event)}
        />
      </div>
      <EventModal
        date={date}
        onClose={() => setModalEvent(null)}
        event={modalEvent}
        eventStore={eventStore}
        dayStartTime={dayStartTime}
      />
    </div>
  );
};

export default DayColumn;
