import React, { useEffect, useState } from "react";
import "../DoctorAppointment.css";

const DoctorAvailability = () => {

    const API_URL = "http://localhost:3000/availability";

    const [availability, setAvailability] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [healthServices, setHealthServices] = useState([]);

    const [formData, setFormData] = useState({
        doctor_name: "",
        service_id: "",
        available_date: "",
        start_time: "",
        end_time: ""
    });

    const [message, setMessage] = useState("");

    // GET ALL AVAILABILITY
    const fetchAvailability = async () => {
        try {
            const response = await fetch(`${API_URL}/all`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setAvailability(data);

        } catch (error) {
            setMessage(error.message);
        }
    };

    // GET ALL DOCTORS
    const fetchDoctors = async () => {
        try {
            const response = await fetch(`${API_URL}/doctors`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDoctors(data);

        } catch (error) {
            setMessage(error.message);
        }
    };

    // GET ALL HEALTH SERVICES
    const fetchHealthServices = async () => {
        try {
            const response = await fetch(`${API_URL}/health-services`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setHealthServices(data);

        } catch (error) {
            setMessage(error.message);
        }
    };

    // LOAD DATA
    useEffect(() => {
        fetchAvailability();
        fetchDoctors();
        fetchHealthServices();
    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // SAVE AVAILABILITY
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(`${API_URL}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    service_id: Number(formData.service_id),
                    start_time: formData.start_time + ":00",
                    end_time: formData.end_time + ":00"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setMessage(data.message);

            setFormData({
                doctor_name: "",
                service_id: "",
                available_date: "",
                start_time: "",
                end_time: ""
            });

            await fetchAvailability();

        } catch (error) {
            setMessage(error.message);
        }
    };

    // UPDATE STATUS
    const handleStatusChange = async (item) => {

        const newStatus =
            item.status === "Available"
                ? "Unavailable"
                : "Available";

        try {
            const response = await fetch(
                `${API_URL}/update/${item.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        doctor_name: item.doctor_name,
                        service_id: item.service_id,
                        available_date: String(item.available_date).slice(0, 10),
                        start_time: String(item.start_time).slice(0, 8),
                        end_time: String(item.end_time).slice(0, 8),
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setMessage(data.message);

            await fetchAvailability();

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="availability-container">

            <h2>Doctor Availability</h2>

            <p>{message}</p>

            {/* ADD DOCTOR AVAILABILITY */}
            <form onSubmit={handleSubmit}>

                {/* DOCTOR DROPDOWN */}
                <label>Doctor Name</label>

                <select
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Doctor</option>

                    {doctors.map((doctor) => (
                        <option
                            key={doctor.doctor_id}
                            value={doctor.doctor_name}
                        >
                            {doctor.doctor_name}
                        </option>
                    ))}
                </select>

                {/* HEALTH SERVICE DROPDOWN */}
                <label>Health Service</label>

                <select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Health Service</option>

                    {healthServices.map((service) => (
                        <option
                            key={service.service_id}
                            value={service.service_id}
                        >
                            {service.service_name}
                        </option>
                    ))}
                </select>

                <label>Available Date</label>

                <input
                    type="date"
                    name="available_date"
                    value={formData.available_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                />

                <label>Start Time</label>

                <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                />

                <label>End Time</label>

                <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Save Availability
                </button>

            </form>

            {/* AVAILABLE SCHEDULES */}
            <h3>Available Schedules</h3>

            {availability.filter(
                (item) => item.status === "Available"
            ).length > 0 ? (

                availability
                    .filter((item) => item.status === "Available")
                    .map((item) => (

                        <div
                            key={item.id}
                            className="availability-card"
                        >

                            <p>Doctor Name: {item.doctor_name}</p>

                            <p>
                                Health Service: {item.service_name || "Not assigned"}
                            </p>

                            <p>
                                Date: {String(item.available_date).slice(0, 10)}
                            </p>

                            <p>
                                Start Time: {String(item.start_time).slice(0, 5)}
                            </p>

                            <p>
                                End Time: {String(item.end_time).slice(0, 5)}
                            </p>

                            <p>Status: {item.status}</p>

                            <button
                                type="button"
                                onClick={() => handleStatusChange(item)}
                            >
                                Change to Unavailable
                            </button>

                        </div>
                    ))

            ) : (
                <p>No available schedules found.</p>
            )}

            {/* UNAVAILABLE SCHEDULES */}
            <h3>Unavailable Schedules</h3>

            {availability.filter(
                (item) => item.status === "Unavailable"
            ).length > 0 ? (

                availability
                    .filter((item) => item.status === "Unavailable")
                    .map((item) => (

                        <div
                            key={item.id}
                            className="availability-card"
                        >

                            <p>Doctor Name: {item.doctor_name}</p>

                            <p>
                                Health Service: {item.service_name || "Not assigned"}
                            </p>

                            <p>
                                Date: {String(item.available_date).slice(0, 10)}
                            </p>

                            <p>
                                Start Time: {String(item.start_time).slice(0, 5)}
                            </p>

                            <p>
                                End Time: {String(item.end_time).slice(0, 5)}
                            </p>

                            <p>Status: {item.status}</p>

                            <button
                                type="button"
                                onClick={() => handleStatusChange(item)}
                            >
                                Change to Available
                            </button>

                        </div>
                    ))

            ) : (
                <p>No unavailable schedules found.</p>
            )}

        </div>
    );
};

export default DoctorAvailability;