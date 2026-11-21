// Component para ipakita ang lahat ng medical records

function NurseMedicalRecordsList({ records, handleEdit }) {
    return (
        <div className="medical-records-list">

            <h3>Medical Records List</h3>

            {/* Check kung may medical records */}
            {records.length === 0 ? (
                <p className="medical-empty">
                    No medical records found.
                </p>
            ) : (

                // I-display ang bawat medical record
                records.map((record) => (
                    <div
                        className="medical-record-card"
                        key={record.record_id}
                    >

                        <h4>Record #{record.record_id}</h4>

                        <p>
                            <strong>Patient ID:</strong> {record.patient_id}
                        </p>

                        <p>
                            <strong>Visit Date:</strong>{" "}
                            {String(record.visit_date).slice(0, 10)}
                        </p>

                        <p>
                            <strong>Blood Pressure:</strong>{" "}
                            {record.blood_pressure}
                        </p>

                        <p>
                            <strong>Temperature:</strong>{" "}
                            {record.temperature} °C
                        </p>

                        <p>
                            <strong>Weight:</strong> {record.weight} kg
                        </p>

                        <p>
                            <strong>Height:</strong> {record.height} cm
                        </p>

                        <p>
                            <strong>Symptoms:</strong> {record.symptoms}
                        </p>

                        <p>
                            <strong>Diagnosis:</strong> {record.diagnosis}
                        </p>

                        <p>
                            <strong>Treatment:</strong> {record.treatment}
                        </p>

                        <p>
                            <strong>Notes:</strong> {record.notes}
                        </p>

                        {/* Edit Button */}
                        <button
                            className="medical-edit-btn"
                            onClick={() => handleEdit(record)}
                        >
                            Edit Record
                        </button>

                    </div>
                ))
            )}

        </div>
    );
}

export default NurseMedicalRecordsList;