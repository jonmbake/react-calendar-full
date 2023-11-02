import React from 'react';
import CalendarEventStore from '../calendar-event-store';
import { areDatesEqual } from '../utils/date';

interface Props {
  activeDate: Date;
  eventStore: CalendarEventStore;
  onDayClick: (date: Date) => void;
}

const MonthView = ({ activeDate, eventStore, onDayClick }: Props) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth(),
    1,
  ).getDay();
  const daysInMonth = getDaysInMonth(activeDate);
  const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

  return (
    <div className="container">
      <div className="calendar-month-view">
        <div className="weekdays-row">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div className="day-header" key={day}>
              {day}
            </div>
          ))}
        </div>

        {Array.from({ length: totalCells }).map((_, index) => {
          const day = index + 1 - firstDayOfMonth;
          const date = new Date(
            activeDate.getFullYear(),
            activeDate.getMonth(),
            day,
          );
          const isWithinMonth = day > 0 && day <= daysInMonth;
          const eventCount = isWithinMonth
            ? eventStore.eventsForDate(date).length
            : 0;

          return (
            <div
              className={`calendar-day ${
                isWithinMonth ? 'active' : 'inactive'
              }`}
              key={index}
              onClick={() => onDayClick(date)}
            >
              <div className={areDatesEqual(date, new Date()) ? 'fw-bold' : ''}>
                {isWithinMonth ? day : ''}
              </div>
              {eventCount > 0 && (
                <div className="badge bg-primary">
                  {eventCount} Event{eventCount > 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
