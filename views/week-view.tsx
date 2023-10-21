import { useState } from "react";
import CalendarEventStore from "../calendar-event-store";
import CalendarEventsForDate from "../components/calendar-events-for-date";
import HoursColumn from "../components/hours-column";
import { datesOfWeek, daysOfWeekShort } from "../utils/date";

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
  const [showModal, setShowModal] = useState<boolean>(false);

  const numberOfHoursBetweenDayStartEnd = dayEndTime - dayStartTime;

  return (
    <div className="container">
      <div className="row weekly-view">
        <HoursColumn dayStartTime={dayStartTime} dayEndTime={dayEndTime} />
        {datesOfWeek(activeDate).map((date) => (
          <div className="d-flex flex-column date-col col day-col">
            <div className="day-row">
              <strong>{date.getDate()}</strong> {daysOfWeekShort[date.getDay()]}
            </div>
            <div
              className="event-col border"
              style={{ height: `${60 * numberOfHoursBetweenDayStartEnd}px` }}
            >
              <CalendarEventsForDate
                dayStartTime={dayStartTime}
                date={date}
                events={eventStore.events}
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
