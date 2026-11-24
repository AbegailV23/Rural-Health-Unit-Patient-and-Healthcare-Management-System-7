import React from "react";
import PharmacistDashboard from "./pages/PharmacistDashboard.jsx";
import DoctorAppointmentPage from "./pages/DoctorAppointmentPage.jsx";
import DoctorAvailability from "./components/DoctorAvailability";
import NurseMedicalRecordsPage from "./pages/NurseMedicalRecordsPage.jsx";
import FollowUpAppointmentPage from "./pages/FollowUpAppointmentPage";
import "./style.css";


function App() {
    return (
        <div>
            <PharmacistDashboard />
            <DoctorAppointmentPage />
            <DoctorAvailability />
            <NurseMedicalRecordsPage />
            <FollowUpAppointmentPage />
        </div>
    );
}


export default App;