const PatientAppointmentModal = ({
    selectedService,
    selectedDoctor,
    selectedDate,
    selectedTime,
    onClose,
    onConfirm
}) => {

    const dateParts = selectedDate.split("-");

    const displayDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
    ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return (
        <div className="appointment-modal-overlay">

            <div className="appointment-modal">

                <div className="modal-header">
                    <h2>Appointment Summary</h2>
                    <button onClick={onClose}>×</button>
                </div>

                <p className="modal-description">
                    Please review your appointment details.
                </p>

                <div className="appointment-details">

                    <div className="detail-row">
                        <span>Health Service</span>
                        <strong>{selectedService}</strong>
                    </div>

                    <div className="detail-row">
                        <span>Doctor</span>
                        <strong>{selectedDoctor}</strong>
                    </div>

                    <div className="detail-row">
                        <span>Date</span>
                        <strong>{displayDate}</strong>
                    </div>

                    <div className="detail-row">
                        <span>Time</span>
                        <strong>{selectedTime}</strong>
                    </div>

                </div>

                <div className="modal-actions">
                    <button
                        className="modal-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="modal-confirm"
                        onClick={onConfirm}
                    >
                        Confirm Appointment
                    </button>
                </div>

            </div>

        </div>
    );
};

export default PatientAppointmentModal;