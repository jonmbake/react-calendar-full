import CalendarEventStore from "../calendar-event-store";
import DayColumn from "../components/day-column";
import HoursColumn from "../components/hours-column";

interface Props {
  activeDate: Date;
  dayStartTime: number;
  dayEndTime: number;
  eventStore: CalendarEventStore;
}

const DayView = ({
  activeDate,
  dayStartTime,
  dayEndTime,
  eventStore,
}: Props) => {
  return (
    <div className="container">
      <div className="row day-view">
        <HoursColumn dayStartTime={dayStartTime} dayEndTime={dayEndTime} />
        <DayColumn
          date={activeDate}
          dayStartTime={dayStartTime}
          dayEndTime={dayEndTime}
          eventStore={eventStore}
        />
      </div>
    </div>
  );
};

export default DayView;
