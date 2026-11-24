import { useState } from "react";

import PatientServiceList from "../components/patientServiceList";
import PatientDoctorList from "../components/patientDoctorList";
import PatientCalendar from "../components/patientCalendar";
import PatientTimeSlots from "../components/patientTimeSlots";
import PatientAppointmentModal from "../components/patientAppointmentModal";
import "../patientAvailability.css";

const PatientAvailabilityPage = () => {

    const [selectedService, setSelectedService] = useState("Immunization");
    const [selectedDoctor, setSelectedDoctor] = useState(1);
    const [selectedDate, setSelectedDate] = useState("2026-11-18");
    const [selectedTime, setSelectedTime] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime("");
    };

    const handleContinue = () => {
    setShowModal(true);
    };

    const handleConfirm = () => {
    setShowModal(false);
    setIsConfirmed(true);
    };

    return (
        <main className="patient-page">

            <header className="patient-header">
                <h1>Book an Appointment</h1>
                <p>Select your health service, doctor, date, and preferred time.</p>
            </header>

            <PatientServiceList
                selectedService={selectedService}
                setSelectedService={setSelectedService}
            />

            <PatientDoctorList
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
            />

            <div className="appointment-selection">

                <PatientCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={handleDateChange}
                />

               <PatientTimeSlots
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    selectedDate={selectedDate}
                    selectedService={selectedService}
                    onContinue={handleContinue}
                />

            </div>

            {showModal && (
                <PatientAppointmentModal
                    selectedService={selectedService}
                    selectedDoctor="Dr. Elena Reyes"
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                />
            )}

            {isConfirmed && (
                <div className="appointment-modal-overlay">

                    <div className="appointment-modal success-modal">

                      <div className="success-icon">
                       ✓
                      </div>

                      <h2>Appointment Confirmed!</h2>

                      <p>
                         Your appointment has been successfully confirmed.
                      </p>

                    <button
                        className="modal-confirm"
                        onClick={() => setIsConfirmed(false)}
                    >
                        Done
                    </button>

            </div>

        </div>
    )}

        </main>
    );
};

export default PatientAvailabilityPage;