
import DoctorAppointmentHeader from "../components/DoctorAppointmentHeader";
import DoctorAppointmentList from "../components/DoctorAppointmentList";
import "../DoctorAppointment.css";

function DoctorAppointmentPage() {

    const data = [
        {
            id: 1,
            patient_name: "Juan Dela Cruz",
            appointment_date: "2026-11-19",
            appointment_time: "09:00 AM",
            status: "Scheduled"
        },
        {
            id: 2,
            patient_name: "Maria Santos",
            appointment_date: "2026-11-20",
            appointment_time: "10:00 AM",
            status: "Completed"
        }
    ];

    return (
        <div className="doctor-appointment-page">
            <DoctorAppointmentHeader />
            <DoctorAppointmentList data={data} />
        </div>
    );
}

export default DoctorAppointmentPage;
