import { useEffect, useState } from "react";
import { DayView, MonthView, WeekView } from "./views";
import { getDateInfo, moveDate } from "./utils/date";
import CalendarEventStore from "./calendar-event-store";
import 'bootstrap/dist/css/bootstrap.css'
import './calendar.css'

export interface Props {
  eventStore: CalendarEventStore;
}

const Calendar = ({ eventStore }: Props) => {
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
          dayStartTime={5}
          dayEndTime={23}
          eventStore={eventStore}
        />
      );
      break;
    case "WEEK":
      viewEL = (
        <WeekView
          activeDate={activeDate}
          dayStartTime={5}
          dayEndTime={23}
          eventStore={eventStore}
        />
      );
      break;
    case "MONTH":
      viewEL = (
        <MonthView
          activeDate={activeDate}
          dayStartTime={5}
          dayEndTime={23}
          eventStore={eventStore}
        />
      );
      break;
  }

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
              onClick={() => setActiveDate(moveDate(activeDate, -7))}
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
              onClick={() => setActiveDate(moveDate(activeDate, 7))}
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
