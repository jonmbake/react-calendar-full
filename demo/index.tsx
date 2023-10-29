import Calendar from "../src/index";
import CalendarEventStore, { CalendarEvent } from "../src/calendar-event-store";
import React from "react";
import ReactDOM from 'react-dom';

function CalendarDemo() {
  const demoEvents: Array<CalendarEvent> = [
    {
      id: 1,
      description: "Morning Meeting",
      date: "2023-10-24",
      startTime: "09:00",
      endTime: "10:00"
    },
    {
      id: 2,
      description: "Lunch with Client",
      date: "2023-10-24",
      startTime: "12:30",
      endTime: "13:30"
    },
    {
      id: 3,
      description: "Project Review",
      date: "2023-10-25",
      startTime: "15:00",
      endTime: "16:30"
    },
    {
      id: 4,
      description: "Team Outing",
      date: "2023-10-26",
      startTime: "17:00",
      endTime: "20:00"
    }
  ];
  
  const calenderEventStore = new CalendarEventStore(demoEvents);

  return (
    <div className="container">
      <Calendar
        activeDate={new Date("2023-10-24T00:00")}
        dayStartTime={5}
        dayEndTime={23}
        eventStore={calenderEventStore}
      />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <CalendarDemo />
  </React.StrictMode>,
  document.getElementById('calendar')
);