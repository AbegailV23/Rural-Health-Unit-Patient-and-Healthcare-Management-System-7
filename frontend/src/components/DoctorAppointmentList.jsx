
const DoctorAppointmentList = ({ data = [] }) => {

    return (
        <section className="doctor-appointment-list">

            <h2>Appointment List</h2>

            <div className="appointment-heading">
                <p>Patient Name</p>
                <p>Appointment Date</p>
                <p>Appointment Time</p>
                <p>Status</p>
            </div>

            {data.length === 0 ? (

                <p>No appointment records found.</p>

            ) : (

                <div className="appointment-table-container">

                    {data.map((appointment) => (

                        <div
                            key={appointment.id}
                            className="appointment-item"
                        >
                            <p>{appointment.patient_name}</p>
                            <p>{appointment.appointment_date}</p>
                            <p>{appointment.appointment_time}</p>
                            <p>{appointment.status}</p>
                        </div>

                    ))}

                </div>

            )}

        </section>
    );
};

export default DoctorAppointmentList;
