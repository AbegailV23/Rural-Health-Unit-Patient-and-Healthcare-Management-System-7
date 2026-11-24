
const FollowUpAppointmentList = ({ dailySchedules = [], handleEdit }) => {

    // Displays daily follow-up appointment schedules.
    return (
        <div className="follow-up-list">

            <h3>Daily Follow-up Appointment Schedule</h3>

            {dailySchedules.length > 0 ? (

                dailySchedules.map((daily) => (

                    <div
                        className="daily-schedule-card"
                        key={daily.scheduled_date}
                    >

                        {/* Displays scheduled date */}
                        <h3>
                            Scheduled Date: {daily.scheduled_date}
                        </h3>

                        {/* Displays registered patients */}
                        <p>
                            <strong>Registered Patients:</strong>{" "}
                            {daily.total_patients} / 10
                        </p>

                        {/* Displays available slots */}
                        <p>
                            <strong>Available Slots:</strong>{" "}
                            {daily.available_slots}
                        </p>

                        {/* Checks if the daily limit is reached */}
                        {daily.is_full ? (
                            <p className="slots-full">
                                Maximum limit reached. No available slots.
                            </p>
                        ) : (
                            <p className="slots-available">
                                Slots are still available.
                            </p>
                        )}

                        {/* Displays patients under each date */}
                        <div className="daily-patient-list">

                            {daily.appointments.map((appointment) => (

                                <div
                                    className="follow-up-card"
                                    key={appointment.follow_up_id}
                                >

                                    <h4>Patient Information</h4>

                                    <p>
                                        <strong>Patient ID:</strong>{" "}
                                        {appointment.patient_id}
                                    </p>

                                    <p>
                                        <strong>Patient Name:</strong>{" "}
                                        {appointment.patient_name}
                                    </p>

                                    <p>
                                        <strong>Appointment Time:</strong>{" "}
                                        {String(appointment.appointment_time).slice(0, 5)}
                                    </p>

                                    <p>
                                        <strong>Reason:</strong>{" "}
                                        {appointment.reason || "No reason provided"}
                                    </p>

                                    <button
                                        type="button"
                                        className="follow-up-edit-btn"
                                        onClick={() => handleEdit(appointment)}
                                    >
                                        Edit Appointment
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                ))

            ) : (

                <p>No follow-up appointments found.</p>

            )}

        </div>
    );
};

export default FollowUpAppointmentList;
