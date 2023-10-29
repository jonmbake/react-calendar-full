import React from 'react';
import CalendarEventStore from "../calendar-event-store";
import HoursColumn from "../components/hours-column";
import { datesOfWeek } from "../utils/date";
import DayColumn from "../components/day-column";

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
  return (
    <div className="container">
      <div className="row weekly-view">
        <HoursColumn dayStartTime={dayStartTime} dayEndTime={dayEndTime} />
        {datesOfWeek(activeDate).map((date) => (
          <DayColumn
            date={date}
            dayStartTime={dayStartTime}
            dayEndTime={dayEndTime}
            eventStore={eventStore}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
