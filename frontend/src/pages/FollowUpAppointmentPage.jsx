
import { useState, useEffect } from "react";

import FollowUpAppointmentHeader from "../components/FollowUpAppointmentHeader";
import FollowUpAppointmentForm from "../components/FollowUpAppointmentForm";
import FollowUpAppointmentList from "../components/FollowUpAppointmentList";

import "../FollowUpAppointment.css";

// Backend API address.
const API_URL = "http://localhost:3000/follow-up-appointments";

function FollowUpAppointmentPage() {

    // Stores all appointments from the database.
    const [appointments, setAppointments] = useState([]);

    // Stores the form input values.
    const [formData, setFormData] = useState({
        patient_id: "",
        patient_name: "",
        scheduled_date: "",
        appointment_time: "",
        reason: ""
    });

    // Stores the ID of the appointment being edited.
    const [editId, setEditId] = useState(null);

    // Stores the message after adding or updating.
    const [message, setMessage] = useState("");

    // Gets all appointments from the backend.
    const fetchAppointments = async () => {
        try {
            const response = await fetch(`${API_URL}/all`);
            const result = await response.json();

            if (result.success) {
                setAppointments(result.data);
            }

        } catch (error) {
            setMessage("Unable to load appointments.");
        }
    };

    // Loads appointments when the page opens.
    useEffect(() => {
        fetchAppointments();
    }, []);

    // Updates the form values when the user types.
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Clears the form and resets edit mode.
    const clearForm = () => {
        setFormData({
            patient_id: "",
            patient_name: "",
            scheduled_date: "",
            appointment_time: "",
            reason: ""
        });

        setEditId(null);
    };

    // Adds a new appointment or updates an existing appointment.
    const handleSubmit = async (event) => {
        event.preventDefault();

        let url = `${API_URL}/add`;
        let method = "POST";

        // Changes the URL and method when updating.
        if (editId !== null) {
            url = `${API_URL}/update/${editId}`;
            method = "PUT";
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            setMessage(result.message);

            // Clears the form and refreshes the list after success.
            if (result.success) {
                clearForm();
                fetchAppointments();
            }

        } catch (error) {
            setMessage("Something went wrong.");
        }
    };

    // Loads the selected appointment into the form for editing.
    const handleEdit = (appointment) => {
        setFormData({
            patient_id: appointment.patient_id,
            patient_name: appointment.patient_name,
            scheduled_date: String(appointment.scheduled_date).slice(0, 10),
            appointment_time: String(appointment.appointment_time).slice(0, 5),
            reason: appointment.reason || ""
        });

        setEditId(appointment.follow_up_id);

        window.scrollTo(0, 0);
    };

    return (
        <div className="follow-up-page">

            <FollowUpAppointmentHeader />

            {message && (
                <p className="follow-up-message">
                    {message}
                </p>
            )}

            <FollowUpAppointmentForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clearForm={clearForm}
                editId={editId}
            />

            <FollowUpAppointmentList
                appointments={appointments}
                handleEdit={handleEdit}
            />

        </div>
    );
}

export default FollowUpAppointmentPage;
