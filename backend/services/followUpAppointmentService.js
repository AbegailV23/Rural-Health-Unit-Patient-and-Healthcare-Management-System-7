
import {
    getAllAppointments,
    findAppointmentById,
    checkDuplicateAppointment,
    countAppointmentsByDate,
    insertAppointment,
    updateAppointment
} from "../models/followUpAppointmentModel.js";

// Maximum number of patients per day.
const DAILY_LIMIT = 10;

// VALIDATE APPOINTMENT
// Sinusuri kung kumpleto ang appointment information.
const validateAppointment = (data) => {

    if (
        !data.patient_id ||
        !data.patient_name ||
        !data.scheduled_date ||
        !data.appointment_time
    ) {
        throw new Error("Please complete all required fields.");
    }

    // Check date format.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.scheduled_date)) {
        throw new Error("Invalid appointment date.");
    }

    // Check time format.
    if (!/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(data.appointment_time)) {
        throw new Error("Invalid appointment time.");
    }

    return {
        patient_id: String(data.patient_id).trim(),
        patient_name: String(data.patient_name).trim(),
        scheduled_date: data.scheduled_date,
        appointment_time: data.appointment_time,
        reason: data.reason || null
    };
};

// GET APPOINTMENTS
// Kinukuha ang lahat ng appointments.
export const getAppointmentsService = async () => {
    return await getAllAppointments();
};

// ADD APPOINTMENT
// Nagdadagdag ng appointment pagkatapos ng validation.
export const addAppointmentService = async (data) => {

    const appointment = validateAppointment(data);

    // Check duplicate appointment.
    const duplicate = await checkDuplicateAppointment(
        appointment.patient_id,
        appointment.scheduled_date,
        appointment.appointment_time
    );

    if (duplicate) {
        throw new Error("This patient already has this appointment schedule.");
    }

    // Check daily patient limit.
    const total = await countAppointmentsByDate(
        appointment.scheduled_date
    );

    if (total >= DAILY_LIMIT) {
        throw new Error("Only 10 patients are allowed per day.");
    }

    // Save appointment.
    const newId = await insertAppointment(appointment);

    return {
        follow_up_id: newId,
        message: "Appointment added successfully."
    };
};

// UPDATE APPOINTMENT
// Ina-update ang existing appointment.
export const updateAppointmentService = async (id, data) => {

    const appointment = validateAppointment(data);

    // Check if appointment exists.
    const existingAppointment = await findAppointmentById(id);

    if (!existingAppointment) {
        throw new Error("Appointment not found.");
    }

    // Check duplicate appointment.
    const duplicate = await checkDuplicateAppointment(
        appointment.patient_id,
        appointment.scheduled_date,
        appointment.appointment_time,
        id
    );

    if (duplicate) {
        throw new Error("This patient already has this appointment schedule.");
    }

    // Check daily limit.
    // Exclude the appointment being updated.
    const total = await countAppointmentsByDate(
        appointment.scheduled_date
    );

    if (
        existingAppointment.scheduled_date === appointment.scheduled_date &&
        total > DAILY_LIMIT
    ) {
        throw new Error("Only 10 patients are allowed per day.");
    }

    if (
        existingAppointment.scheduled_date !== appointment.scheduled_date &&
        total >= DAILY_LIMIT
    ) {
        throw new Error("Only 10 patients are allowed per day.");
    }

    // Update appointment.
    await updateAppointment(id, appointment);

    return {
        message: "Appointment updated successfully."
    };
};
