const FollowUpAppointmentList = ({ appointments, handleEdit }) => {

    // Displays all saved follow-up appointments.
    return (
        <div className="follow-up-list">
            <h3>Follow-up Appointment List</h3>

            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div
                        className="follow-up-card"
                        key={appointment.follow_up_id}
                    >
                        <h4>Patient Information</h4>

                        <p>
                            <strong>Patient ID:</strong> {appointment.patient_id}
                        </p>

                        <p>
                            <strong>Patient Name:</strong> {appointment.patient_name}
                        </p>

                        <p>
                            <strong>Scheduled Date:</strong>{" "}
                            {String(appointment.scheduled_date).slice(0, 10)}
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
                            className="follow-up-edit-btn"
                            onClick={() => handleEdit(appointment)}
                        >
                            Edit Appointment
                        </button>
                    </div>
                ))
            ) : (
                <p>No follow-up appointments found.</p>
            )}
        </div>
    );
};

export default FollowUpAppointmentList;