
import { useState, useEffect } from "react";
import DoctorAppointmentHeader from "../components/DoctorAppointmentHeader";
import DoctorAppointmentList from "../components/DoctorAppointmentList";
import "../DoctorAppointment.css";

function DoctorAppointmentPage() {

    const [data, setData] = useState([]);
    const [date, setDate] = useState("");

    const getData = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:3000/appointment/all?date=${date}`
            );

            const result = await response.json();

            if (response.ok && Array.isArray(result)) {
                setData(result);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, [date]);

    return (
        <div className="doctor-appointment-page">

            <DoctorAppointmentHeader />

            <div className="appointment-date-filter">

                <label>Select Appointment Date:</label>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button onClick={() => setDate("")}>
                    Show All
                </button>

            </div>

            <DoctorAppointmentList data={data} />

        </div>
    );
}

export default DoctorAppointmentPage;
