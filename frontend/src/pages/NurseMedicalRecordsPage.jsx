import { useEffect, useState } from "react";
import NurseMedicalRecordsHeader from "../components/NurseMedicalRecordsHeader";
import NurseMedicalRecordsForm from "../components/NurseMedicalRecordsForm";
import NurseMedicalRecordsList from "../components/NurseMedicalRecordsList";
import "../NurseMedicalRecords.css";

function NurseMedicalRecordsPage() {

    // Backend API URL
    const API_URL = "http://localhost:3000/medical-records";

    // State para sa medical records list
    const [records, setRecords] = useState([]);

    // State para sa Patient ID
    const [patientId, setPatientId] = useState("");

    // State para malaman kung nag-e-edit ng record
    const [recordId, setRecordId] = useState(null);

    // State para sa form fields
    const [formData, setFormData] = useState({
        visit_date: "",
        blood_pressure: "",
        temperature: "",
        weight: "",
        height: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: ""
    });

    // State para sa success at error messages
    const [message, setMessage] = useState("");

    // ==========================================
// 2.1.2 VIEW AND UPDATE MEDICAL RECORDS
// ==========================================

// State para sa Patient ID na ise-search
const [searchPatientId, setSearchPatientId] = useState("");

// State para sa search results
const [searchResults, setSearchResults] = useState([]);

// State para malaman kung nakapag-search na
const [hasSearched, setHasSearched] = useState(false);

// State para malaman kung nagse-search pa
const [isSearching, setIsSearching] = useState(false);

    // Kunin ang lahat ng medical records mula sa backend
    const fetchRecords = async () => {
        try {
            const response = await fetch(`${API_URL}/all`);

            if (!response.ok) {
                throw new Error("Failed to load medical records.");
            }

            const data = await response.json();

            setRecords(data);

        } catch (error) {
            setMessage(error.message);
        }
    };

    // Kunin ang records kapag binuksan ang page
    useEffect(() => {
        fetchRecords();
    }, []);

    // ==========================================
// 2.1.2 SEARCH PATIENT MEDICAL RECORDS
// ==========================================

const handleSearchPatient = async (e) => {
    e.preventDefault();

    // Check kung may inilagay na Patient ID
    if (!searchPatientId.trim()) {
        setMessage("Please enter Patient ID.");
        return;
    }

    try {
        setIsSearching(true);
        setMessage("");

        // Kunin ang medical records gamit ang Patient ID
        const response = await fetch(
            `${API_URL}/patient/${searchPatientId}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to retrieve medical records."
            );
        }

        // I-store ang search results
        setSearchResults(Array.isArray(data) ? data : []);

        // Markahan na nakapag-search na
        setHasSearched(true);

        // Magpakita ng resulta
        setMessage(
            data.length === 0
                ? "No medical records found."
                : `${data.length} medical record(s) found.`
        );

    } catch (error) {
        setMessage(error.message);
        setSearchResults([]);
        setHasSearched(true);

    } finally {
        setIsSearching(false);
    }
};


// Clear Search Function
const handleClearSearch = () => {
    setSearchPatientId("");
    setSearchResults([]);
    setHasSearched(false);
    setMessage("");
};

    // Kunin ang changes sa form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // I-clear ang form fields
    const clearForm = () => {
        setPatientId("");
        setRecordId(null);

        setFormData({
            visit_date: "",
            blood_pressure: "",
            temperature: "",
            weight: "",
            height: "",
            symptoms: "",
            diagnosis: "",
            treatment: "",
            notes: ""
        });
    };

    // Mag-save o mag-update ng medical record
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Piliin ang API URL at method
        const url = recordId
            ? `${API_URL}/update/${recordId}`
            : `${API_URL}/add`;

        const method = recordId ? "PUT" : "POST";

        // Ihanda ang data na ipapadala sa backend
        const requestData = recordId
            ? formData
            : {
                patient_id: Number(patientId),
                ...formData
            };

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to save medical record."
                );
            }

            // Magpakita ng success message
            setMessage(
                recordId
                    ? "Medical record updated successfully!"
                    : "Medical record saved successfully!"
            );

            // I-clear ang form at i-refresh ang list
            clearForm();
            await fetchRecords();

        } catch (error) {
            setMessage(error.message);
        }
    };

    // Piliin ang medical record na gustong i-edit
    const handleEdit = (record) => {
        setRecordId(record.record_id);
        setPatientId(record.patient_id);

        setFormData({
            visit_date: record.visit_date
                ? String(record.visit_date).slice(0, 10)
                : "",
            blood_pressure: record.blood_pressure || "",
            temperature: record.temperature ?? "",
            weight: record.weight ?? "",
            height: record.height ?? "",
            symptoms: record.symptoms || "",
            diagnosis: record.diagnosis || "",
            treatment: record.treatment || "",
            notes: record.notes || ""
        });

        setMessage("Editing medical record #" + record.record_id);

        // Bumalik sa taas kung mahaba ang list
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="nurse-medical-container">

            {/* Header */}
            <NurseMedicalRecordsHeader />
            {/* ==================================
    2.1.2 SEARCH PATIENT MEDICAL RECORDS
================================== */}

<div className="medical-search-container">

    <h3>Search Patient Medical Records</h3>

    <form onSubmit={handleSearchPatient}>

        {/* Patient ID Input */}
        <input
            type="number"
            placeholder="Enter Patient ID"
            value={searchPatientId}
            onChange={(e) => setSearchPatientId(e.target.value)}
            min="1"
            required
        />

        {/* Search Button */}
        <button type="submit" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
        </button>

        {/* Clear Search Button */}
        <button
            type="button"
            onClick={handleClearSearch}
        >
            Clear Search
        </button>

    </form>

</div>

            {/* Success or Error Message */}
            {message && (
                <p className="medical-message">
                    {message}
                </p>
            )}

            {/* Medical Record Form */}
            <NurseMedicalRecordsForm
                patientId={patientId}
                setPatientId={setPatientId}
                recordId={recordId}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clearForm={clearForm}
            />

            {/* 2.1.2 VIEW MEDICAL RECORDS */}
            <NurseMedicalRecordsList
            // Ipakita ang search results kung nag-search
           // Kung hindi, ipakita ang lahat ng medical records
             records={hasSearched ? searchResults : records}

         // Function para mag-edit ng existing record
             handleEdit={handleEdit}
          />

        </div>
    );
}

export default NurseMedicalRecordsPage;