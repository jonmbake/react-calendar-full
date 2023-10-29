import React from 'react';
import { formatHour } from "../utils/time";

export interface Props {
  dayStartTime: number;
  dayEndTime: number;
}

const HoursColumn = ({ dayStartTime, dayEndTime }: Props) => {
  const numberOfHours = dayEndTime - dayStartTime;
  return (
    <div className="d-flex flex-column date-col col time-col">
      <div className="day-header"></div>
      {Array.from({ length: numberOfHours }).map((_, index) => {
        const hour = dayStartTime + index;
        return (
          <div className="hour-cell text-end px-2">{formatHour(hour)}</div>
        );
      })}
    </div>
  );
};

export default HoursColumn;
