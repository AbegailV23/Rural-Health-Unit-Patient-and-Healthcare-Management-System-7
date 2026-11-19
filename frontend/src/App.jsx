import React from "react";
import PharmacistDashboard from "./pages/PharmacistDashboard.jsx";
import DoctorAppointmentPage from "./pages/DoctorAppointmentPage.jsx";
import DoctorAvailability from "./components/DoctorAvailability";
import "./style.css";


function App() {
    return (
        <div>
            <PharmacistDashboard />
            <DoctorAppointmentPage />
            <DoctorAvailability />
        </div>
    );
}


export default App;