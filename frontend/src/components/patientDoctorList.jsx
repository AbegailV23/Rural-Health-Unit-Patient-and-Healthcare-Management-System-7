const PatientDoctorList = ({ selectedDoctor, setSelectedDoctor }) => {

    const doctors = [
        {
            id: 1,
            name: "Dr. Elena Reyes",
            specialization: "General Medicine",
            nextOpen: "Tue, Nov 17 · 4:30 PM",
            initials: "ER"
        }
    ];

    return (
        <section className="doctor-card">

            <h3>Doctor</h3>

            <div className="doctor-list">

                {doctors.map((doctor) => (
                    <button
                        key={doctor.id}
                        className={
                            selectedDoctor === doctor.id
                                ? "doctor-item active"
                                : "doctor-item"
                        }
                        onClick={() => setSelectedDoctor(doctor.id)}
                    >

                        <div className="doctor-initials">
                            {doctor.initials}
                        </div>

                        <div className="doctor-information">
                            <h4>{doctor.name}</h4>
                            <p>{doctor.specialization}</p>
                            <span>Next open: {doctor.nextOpen}</span>
                        </div>

                        {selectedDoctor === doctor.id && (
                            <span className="doctor-check">✓</span>
                        )}

                    </button>
                ))}

            </div>

        </section>
    );
};

export default PatientDoctorList;