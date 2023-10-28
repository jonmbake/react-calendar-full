import { useEffect, useState } from "react";
import { DayView, MonthView, WeekView } from "./views";
import { getDateInfo, moveDate, moveMonth } from "./utils/date";
import CalendarEventStore from "./calendar-event-store";
import "bootstrap/dist/css/bootstrap.css";
import "./calendar.css";

export interface Props {
  dayStartTime: number;
  dayEndTime: number;
  eventStore: CalendarEventStore;
}

const Calendar = ({ dayStartTime, dayEndTime, eventStore }: Props) => {
  const [view, setView] = useState("WEEK");
  const [activeDate, setActiveDate] = useState(new Date());
  const [, setEvents] = useState(eventStore.events);

  useEffect(() => {
    setEvents(eventStore.events);
  }, [eventStore.events]);

  let viewEL;
  switch (view) {
    case "DAY":
      viewEL = (
        <DayView
          activeDate={activeDate}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
        />
      );
      break;
    case "WEEK":
      viewEL = (
        <WeekView
          activeDate={activeDate}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
        />
      );
      break;
    case "MONTH":
      viewEL = (
        <MonthView
          activeDate={activeDate}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
          onDayClick={(date: Date) => {
            setActiveDate(date);
            setView("DAY");
          }}
        />
      );
      break;
  }

  const moveDateLeft = () => {
    switch (view) {
      case "DAY":
        setActiveDate(moveDate(activeDate, -1));
        break;
      case "WEEK":
        setActiveDate(moveDate(activeDate, -7));
        break;
      case "MONTH":
        setActiveDate(moveMonth(activeDate, -1));
        break;
    }
  };

  const moveDateRight = () => {
    switch (view) {
      case "DAY":
        setActiveDate(moveDate(activeDate, 1));
        break;
      case "WEEK":
        setActiveDate(moveDate(activeDate, 7));
        break;
      case "MONTH":
        setActiveDate(moveMonth(activeDate, 1));
        break;
    }
  };

  const dateInfo = getDateInfo(activeDate);
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
              onClick={() => setActiveDate(new Date())}
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
export default Calendar;
