import { FormEvent, useEffect, useState } from "react";
import CalendarEventStore, { CalendarEvent } from "../calendar-event-store";
import { formatTimeToHHmm } from "../utils/time";
import { formatDateToYYYYMMDD } from "../utils/date";

type Props = {
  date: Date;
  dayStartTime: number;
  onClose: () => void;
  event?: CalendarEvent | null;
  eventStore: CalendarEventStore;
};

const EventModal = ({
  date,
  dayStartTime,
  onClose,
  event,
  eventStore,
}: Props) => {
  const [formData, setFormData] = useState<CalendarEvent>(
    event || {
      id: 0,
      date: formatDateToYYYYMMDD(date),
      description: "",
      startTime: formatTimeToHHmm(dayStartTime, 0),
      endTime: formatTimeToHHmm(dayStartTime + 1, 0),
    },
  );

  useEffect(() => {
    event && setFormData(event);
  }, [event]);

  const isOpen = event != null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    eventStore.addOrUpdate({
      id: event?.id,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      startTime: formData.get("startTime")?.toString() || "",
      endTime: formData.get("endTime")?.toString() || "",
    });
    onClose();
  };

  const handleDelete = (e: FormEvent<HTMLButtonElement>) => {
    if (event?.id == null) {
      onClose();
      return;
    }
    eventStore.delete(event?.id);
    onClose();
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div
        className={`modal ${isOpen ? "show" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Calendar Event</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    name="startTime"
                    step="900"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    name="endTime"
                    step="900"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  {event?.id != null && (
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default EventModal;
