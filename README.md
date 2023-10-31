# react-calendar-plus :calendar: :heavy_plus_sign:

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![React Version](https://img.shields.io/badge/react-v17+-blue.svg)

A React calendar component offering similar functionality to iOS calendar-- can toggle between daily, weekly, and monthly views; can add events, etc.

## Demo

A demo is worth a thousands words! :astonished: **[Check it out the demo!](https://jonmbake.github.io/react-calendar-plus/)**

![React Calendar Plus](https://github.com/jonmbake/screenshots/raw/master/react-calendar-plus.png)

## Installation

Using npm:

```bash
npm install react-calendar-plus --save
```

Or using yarn:

```bash
yarn add react-calendar-plus
```

## Example Usage

```typescript
import React from 'react';
import { Calendar, CalendarEvent, CalendarEventStore } from 'react-calendar-plus';

function CalendarDemo() {
  const initialEvents: Array<CalendarEvent> = [
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
  
  const calenderEventStore = new CalendarEventStore(initialEvents);

  // Support for listening for calendar events:
  calenderEventStore.onAdd((event: CalendarEvent) => {
    // Call server to add event
    fetch('https://api.example.com/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
  });
  calenderEventStore.onUpdate((event: CalendarEvent) => {
    // Call server to add event
    fetch(`https://api.example.com/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
  });
  calenderEventStore.onDelete((event: CalendarEvent) => {
    fetch(`https://api.example.com/events/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

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

export default CalendarDemo;
```


## License

This project is licensed under the MIT License.
