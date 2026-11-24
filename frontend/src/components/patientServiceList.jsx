const PatientServiceList = ({ selectedService, setSelectedService }) => {

    const services = [
        "Immunization",
        "Dental",
        "Pregnancy",
        "Medical",
        "Vaccination"
    ];

    return (
        <section className="service-card">

            <h3>Health service</h3>

            <select
                className="service-dropdown"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
            >
                {services.map((service, index) => (
                    <option key={index} value={service}>
                        {service}
                    </option>
                ))}
            </select>

        </section>
    );
};

export default PatientServiceList;