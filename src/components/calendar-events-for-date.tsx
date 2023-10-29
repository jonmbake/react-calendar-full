import React from 'react';
import { CalendarEvent } from "../calendar-event-store";
import { calculateMinutesSinceMidnight } from "../utils/time";

export interface Props {
  dayStartTime: number;
  events: Array<CalendarEvent>;
  onClick: (e: CalendarEvent) => void;
}

function getEventPosition(
  event: CalendarEvent,
  dayStartTime: number,
): React.CSSProperties {
  const startTimeMinutes = calculateMinutesSinceMidnight(event.startTime);
  const endTimeMinutes = calculateMinutesSinceMidnight(event.endTime);
  const topPx = startTimeMinutes - dayStartTime * 60;
  const heightPx = endTimeMinutes - startTimeMinutes;

  return {
    top: `${topPx}px`,
    height: `${heightPx}px`,
  };
}

const CalendarEventsForDate = ({ dayStartTime, events, onClick }: Props) => {
  return (
    <>
      {events.map((event) => {
        const positionStyle = getEventPosition(event, dayStartTime);
        return (
          <div
            key={event.id}
            className="calendar-event green"
            style={positionStyle}
            onClick={(e: any) => {
              e.stopPropagation();
              onClick(event);
            }}
          >
            {event.description}
          </div>
        );
      })}
    </>
  );
};

export default CalendarEventsForDate;
