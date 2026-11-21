// Form para mag-add at mag-update ng patient medical record

function NurseMedicalRecordsForm({
    patientId,
    setPatientId,
    recordId,
    formData,
    handleChange,
    handleSubmit,
    clearForm
}) {
    return (
        <div className="medical-form-container">

            <h3>
                {recordId ? "Update Medical Record" : "Add Medical Record"}
            </h3>

            <form onSubmit={handleSubmit}>

                {/* Patient ID */}
                <div className="medical-input-group">
                    <label>Patient ID</label>

                    <input
                        type="number"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        disabled={recordId !== null}
                        min="1"
                        required
                    />
                </div>

                {/* Visit Date */}
                <div className="medical-input-group">
                    <label>Visit Date</label>

                    <input
                        type="date"
                        name="visit_date"
                        value={formData.visit_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Blood Pressure */}
                <div className="medical-input-group">
                    <label>Blood Pressure</label>

                    <input
                        type="text"
                        name="blood_pressure"
                        placeholder="Example: 120/80"
                        value={formData.blood_pressure}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Temperature */}
                <div className="medical-input-group">
                    <label>Temperature (°C)</label>

                    <input
                        type="number"
                        name="temperature"
                        step="0.01"
                        min="0"
                        value={formData.temperature}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Weight */}
                <div className="medical-input-group">
                    <label>Weight (kg)</label>

                    <input
                        type="number"
                        name="weight"
                        step="0.01"
                        min="0"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Height */}
                <div className="medical-input-group">
                    <label>Height (cm)</label>

                    <input
                        type="number"
                        name="height"
                        step="0.01"
                        min="0"
                        value={formData.height}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Symptoms */}
                <div className="medical-input-group">
                    <label>Symptoms</label>

                    <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Diagnosis */}
                <div className="medical-input-group">
                    <label>Diagnosis</label>

                    <textarea
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Treatment */}
                <div className="medical-input-group">
                    <label>Treatment</label>

                    <textarea
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Additional Notes */}
                <div className="medical-input-group">
                    <label>Notes</label>

                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                {/* Form Buttons */}
                <div className="medical-buttons">

                    <button type="submit" className="medical-save-btn">
                        {recordId ? "Update Record" : "Save Record"}
                    </button>

                    <button
                        type="button"
                        className="medical-clear-btn"
                        onClick={clearForm}
                    >
                        Clear
                    </button>

                </div>

            </form>
        </div>
    );
}

export default NurseMedicalRecordsForm;