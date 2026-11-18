import React from "react";
import PharmacistDashboard from "./pages/PharmacistDashboard.jsx";
import DoctorAppointmentPage from "./pages/DoctorAppointmentPage.jsx";
import "./style.css";

function App() {
    return (
        <div>
            <PharmacistDashboard />
            <DoctorAppointmentPage />
        </div>
    );
}


export default App;