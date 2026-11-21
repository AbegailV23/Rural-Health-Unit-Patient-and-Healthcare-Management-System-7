import React from "react";
import PharmacistDashboard from "./pages/PharmacistDashboard.jsx";
import DoctorAppointmentPage from "./pages/DoctorAppointmentPage.jsx";
import DoctorAvailability from "./components/DoctorAvailability";
import NurseMedicalRecordsPage from "./pages/NurseMedicalRecordsPage.jsx";
import "./style.css";


function App() {
    return (
        <div>
            <PharmacistDashboard />
            <DoctorAppointmentPage />
            <DoctorAvailability />
            <NurseMedicalRecordsPage />
        </div>
    );
}


export default App;