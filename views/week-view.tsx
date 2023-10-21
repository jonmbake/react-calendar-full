import CalendarEventStore from "../calendar-event-store";

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
  return <div className="container"></div>;
};

export default WeekView;
