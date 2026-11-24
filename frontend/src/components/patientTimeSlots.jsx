import { useState } from "react";

const PatientTimeSlots = ({
    selectedTime,
    setSelectedTime,
    selectedDate,
    selectedService,
    onContinue
    }) => {

    const morningSlots = [
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM"
    ];

    const afternoonSlots = [
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM"
    ];

    const [bookedSlots, setBookedSlots] = useState(["1:00 PM"]);
    const [lastUpdated, setLastUpdated] = useState("Just now");

    const allSlots = [...morningSlots, ...afternoonSlots];
    const openCount = allSlots.length - bookedSlots.length;

    const dateParts = selectedDate ? selectedDate.split("-") : [];

    const displayDate = selectedDate
        ? new Date(
            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2])
        ).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        })
        : "Select an appointment date";

    const refreshSlots = () => {
        setLastUpdated("Just now");
    };

    const displaySlots = (slots) => {
        return slots.map((time, index) => (
            <button
                key={index}
                disabled={!selectedDate || bookedSlots.includes(time)}
                className={
                    bookedSlots.includes(time)
                        ? "time-slot booked"
                        : selectedTime === time
                        ? "time-slot selected"
                        : "time-slot"
                }
                onClick={() => setSelectedTime(time)}
            >
                <strong>{time}</strong>
                <span>
                    {bookedSlots.includes(time) ? "Booked" : "Open"}
                </span>
            </button>
        ));
    };

    return (
        <section className="time-slots-card">

            <div className="time-slots-content">

                <div className="availability-header">
                    <div>
                        <p className="available-label">Available times</p>
                        <h2>{displayDate}</h2>
                    </div>

                    <button
                        className="refresh-button"
                        onClick={refreshSlots}
                    >
                        ↻ Refresh
                    </button>
                </div>

                <p className="time-subtitle">
                    {selectedService} · Dr. Elena Reyes
                </p>

                <div className="slot-summary">
                    <span><strong>{openCount}</strong> open</span>
                    <span><strong>{bookedSlots.length}</strong> booked</span>
                    <span>30-minute visits</span>
                </div>

                <p className="last-updated">
                    Last updated: {lastUpdated}
                </p>

                <h4>Morning</h4>

                <div className="time-grid">
                    {displaySlots(morningSlots)}
                </div>

                <h4>Afternoon</h4>

                <div className="time-grid">
                    {displaySlots(afternoonSlots)}
                </div>

                <div className="time-legend">
                    <span>□ Open</span>
                    <span>▧ Booked (not selectable)</span>
                    <span>🟦 Your selection</span>
                </div>

            </div>

            <div className="time-slots-footer">

                <div>
                    <strong>
                        {selectedTime
                            ? selectedTime
                            : "No time selected yet"}
                    </strong>

                    <p>
                        {selectedTime
                            ? "Your selected appointment time."
                            : "Choose an open slot to continue."}
                    </p>
                </div>

                <button
                  disabled={!selectedTime || !selectedDate}
                  onClick={onContinue}
                >
                    Continue
                </button>

            </div>

        </section>
    );
};

export default PatientTimeSlots;