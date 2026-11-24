import * as patientModel from '../models/patientModel.js';

// Retrieve available appointment slots
export const fetchAvailableSlots = async () => {

    const schedules = await patientModel.fetchDoctorSchedules();
    const appointments = await patientModel.fetchAppointments();

    const availableSlots = schedules.map((schedule) => {

        const existingAppointment = appointments.find((appointment) =>
            appointment.doctor_id == schedule.doctor_id &&
            appointment.appointment_date == schedule.schedule_date &&
            appointment.appointment_time == schedule.time_slot &&
            appointment.status != 'Cancelled'
        );

        return {
            doctor_id: schedule.doctor_id,
            schedule_date: schedule.schedule_date,
            time_slot: schedule.time_slot,
            status: existingAppointment ? 'Occupied' : 'Available'
        };

    });

    return availableSlots;
};