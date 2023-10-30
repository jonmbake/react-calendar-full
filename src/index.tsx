import React, { useEffect, useState } from "react";
import { DayView, MonthView, WeekView } from "./views";
import { getDateInfo, moveDate, moveMonth } from "./utils/date";
import CalendarEventStore, {CalendarEvent} from "./calendar-event-store";
import "bootstrap/dist/css/bootstrap.css";
import "./calendar.css";

export interface Props {
  activeDate?: Date,
  dayStartTime: number;
  dayEndTime: number;
  eventStore: CalendarEventStore;
}

const Calendar = ({ activeDate, dayStartTime, dayEndTime, eventStore }: Props) => {
  const [view, setView] = useState("WEEK");
  const [activeDateState, setActiveDateState] = useState(activeDate || new Date());
  const [, setEvents] = useState(eventStore.events);

  useEffect(() => {
    setEvents(eventStore.events);
  }, [eventStore.events]);

  useEffect(() => {
    setActiveDateState(activeDate || new Date());
  }, [activeDate]);

  let viewEL;
  switch (view) {
    case "DAY":
      viewEL = (
        <DayView
          activeDate={activeDateState}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
        />
      );
      break;
    case "WEEK":
      viewEL = (
        <WeekView
          activeDate={activeDateState}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
        />
      );
      break;
    case "MONTH":
      viewEL = (
        <MonthView
          activeDate={activeDateState}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
          onDayClick={(date: Date) => {
            setActiveDateState(date);
            setView("DAY");
          }}
        />
      );
      break;
  }

  const moveDateLeft = () => {
    switch (view) {
      case "DAY":
        setActiveDateState(moveDate(activeDateState, -1));
        break;
      case "WEEK":
        setActiveDateState(moveDate(activeDateState, -7));
        break;
      case "MONTH":
        setActiveDateState(moveMonth(activeDateState, -1));
        break;
    }
  };

  const moveDateRight = () => {
    switch (view) {
      case "DAY":
        setActiveDateState(moveDate(activeDateState, 1));
        break;
      case "WEEK":
        setActiveDateState(moveDate(activeDateState, 7));
        break;
      case "MONTH":
        setActiveDateState(moveMonth(activeDateState, 1));
        break;
    }
  };

  const dateInfo = getDateInfo(activeDateState);
  return (
    <>
      <div className="d-flex justify-content-between m-4">
        <div className="fs-4">
          <strong>{dateInfo.month}</strong> {dateInfo.year}
        </div>
        <div
          className="calendar-views-toggle btn-group btn-group-sm"
          role="group"
        >
          <button
            className={
              "btn btn-outline-secondary" + (view === "DAY" ? " active" : "")
            }
            onClick={() => setView("DAY")}
          >
            Day
          </button>
          <button
            className={
              "btn btn-outline-secondary" + (view === "WEEK" ? " active" : "")
            }
            onClick={() => setView("WEEK")}
          >
            Week
          </button>
          <button
            className={
              "btn btn-outline-secondary" + (view === "MONTH" ? " active" : "")
            }
            onClick={() => setView("MONTH")}
          >
            Month
          </button>
        </div>
        <div>
          <div
            className="calendar-views-toggle btn-group btn-group-sm"
            role="group"
          >
            <button
              className="btn btn-outline-secondary"
              onClick={moveDateLeft}
            >
              &lt;
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setActiveDateState(new Date())}
            >
              Today
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={moveDateRight}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      {viewEL}
    </>
  );
};
export { CalendarEventStore, CalendarEvent };
export default Calendar;
