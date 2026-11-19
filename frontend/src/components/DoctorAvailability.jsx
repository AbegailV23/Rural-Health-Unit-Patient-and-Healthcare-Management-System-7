
import React, { useEffect, useState } from "react";
import "../DoctorAppointment.css";

const DoctorAvailability = () => {
    const API_URL = "http://localhost:3000/availability";

    const [availability, setAvailability] = useState([]);

    const [formData, setFormData] = useState({
        doctor_name: "",
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

    useEffect(() => {
        fetchAvailability();
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
                available_date: "",
                start_time: "",
                end_time: ""
            });

            fetchAvailability();

        } catch (error) {
            setMessage(error.message);
        }
    };

    // UPDATE STATUS
    const handleStatusChange = async (item) => {
        const newStatus =
            item.status === "Available" ? "Unavailable" : "Available";

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
            fetchAvailability();

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="availability-container">

            <h2>Doctor Availability</h2>

            <p>{message}</p>

            <form onSubmit={handleSubmit}>

                <label>Doctor Name</label>
                <input
                    type="text"
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleChange}
                    placeholder="Enter doctor name"
                    required
                />

                <label>Available Date</label>
                <input
                    type="date"
                    name="available_date"
                    value={formData.available_date}
                    onChange={handleChange}
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

            <h3>Available Schedules</h3>

            {availability.length > 0 ? (
                availability.map((item) => (
                    <div key={item.id} className="availability-card">

                        <p>Doctor Name: {item.doctor_name}</p>
                        <p>Date: {String(item.available_date).slice(0, 10)}</p>
                        <p>Start Time: {String(item.start_time).slice(0, 5)}</p>
                        <p>End Time: {String(item.end_time).slice(0, 5)}</p>
                        <p>Status: {item.status}</p>

                        <button
                            type="button"
                            onClick={() => handleStatusChange(item)}
                        >
                            Change Status
                        </button>

                    </div>
                ))
            ) : (
                <p>No available schedules found.</p>
            )}

        </div>
    );
};

export default DoctorAvailability;
