const FollowUpAppointmentForm = ({
    formData,
    handleChange,
    handleSubmit,
    clearForm,
    editId
}) => {

    // Displays the form for adding and updating appointments.
    return (
        <div className="follow-up-form-container">

            <h3>
                {editId ? "Update Follow-up Appointment" : "Add Follow-up Appointment"}
            </h3>

            <form onSubmit={handleSubmit}>

                <div className="follow-up-input-group">
                    <label>Patient ID</label>
                    <input
                        type="text"
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        placeholder="Enter patient ID"
                        required
                    />
                </div>

                <div className="follow-up-input-group">
                    <label>Patient Name</label>
                    <input
                        type="text"
                        name="patient_name"
                        value={formData.patient_name}
                        onChange={handleChange}
                        placeholder="Enter patient name"
                        required
                    />
                </div>

                <div className="follow-up-input-group">
                    <label>Scheduled Date</label>
                    <input
                        type="date"
                        name="scheduled_date"
                        value={formData.scheduled_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="follow-up-input-group">
                    <label>Appointment Time</label>
                    <input
                        type="time"
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="follow-up-input-group">
                    <label>Reason</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Enter reason for follow-up"
                    ></textarea>
                </div>

                <div className="follow-up-buttons">

                    <button type="submit" className="follow-up-save-btn">
                        {editId ? "Update Appointment" : "Add Appointment"}
                    </button>

                    <button
                        type="button"
                        className="follow-up-clear-btn"
                        onClick={clearForm}
                    >
                        Clear
                    </button>

                </div>

            </form>
        </div>
    );
};

export default FollowUpAppointmentForm;