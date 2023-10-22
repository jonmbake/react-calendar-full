import { useState } from "react";
import CalendarEventStore, { CalendarEvent } from "../calendar-event-store";
import CalendarEventsForDate from "../components/calendar-events-for-date";
import HoursColumn from "../components/hours-column";
import {
  areDatesEqual,
  datesOfWeek,
  daysOfWeekShort,
  formatDateToYYYYMMDD,
} from "../utils/date";
import EventModal from "../components/event-modal";
import { minutesSinceMidnightToHHmm, roundToNearest15 } from "../utils/time";

interface Props {
  activeDate: Date;
  dayStartTime: number;
  dayEndTime: number;
  eventStore: CalendarEventStore;
}

const WeekView = ({
  activeDate,
  dayStartTime,
  dayEndTime,
  eventStore,
}: Props) => {
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null);
  const handleEventSubmit = (eventData: CalendarEvent) => {
    eventStore.addOrUpdate(eventData);
  };

  const numberOfHoursBetweenDayStartEnd = dayEndTime - dayStartTime;

  return (
    <div className="container">
      <div className="row weekly-view">
        <HoursColumn dayStartTime={dayStartTime} dayEndTime={dayEndTime} />
        {datesOfWeek(activeDate).map(date => (
          <div className="d-flex flex-column date-col col day-col">
            <div className={ "day-header" + (areDatesEqual(date, new Date()) ? ' bg-dark-subtle' : '') }>
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
                date={date}
                events={eventStore.events}
                onClick={(event: CalendarEvent) => setModalEvent(event)}
              />
            </div>
          </div>
        ))}
      </div>
      <EventModal
        date={activeDate}
        onClose={() => setModalEvent(null)}
        event={modalEvent}
        onSubmit={handleEventSubmit}
        dayStartTime={dayStartTime}
      />
    </div>
  );
};

export default WeekView;
