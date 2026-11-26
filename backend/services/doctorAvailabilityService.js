import * as doctorAvailability from "../models/doctorAvailability.js";

// VALIDATE DATE AND TIME
const validateSchedule = (data, requireService = true) => {
    const {
        doctor_name,
        service_id,
        available_date,
        start_time,
        end_time
    } = data;

    // CHECK REQUIRED FIELDS
    if (!doctor_name || !available_date || !start_time || !end_time) {
        throw new Error("All fields are required.");
    }

    // CHECK HEALTH SERVICE
    if (requireService && !service_id) {
        throw new Error("Please select a health service.");
    }

    // VALIDATE DATE FORMAT
    if (!/^\d{4}-\d{2}-\d{2}$/.test(available_date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
    }

    // VALIDATE ACTUAL CALENDAR DATE
    const [year, month, day] = available_date.split("-").map(Number);

    const selectedDate = new Date(0);
    selectedDate.setFullYear(year, month - 1, day);
    selectedDate.setHours(0, 0, 0, 0);

    if (
        selectedDate.getFullYear() !== year ||
        selectedDate.getMonth() !== month - 1 ||
        selectedDate.getDate() !== day
    ) {
        throw new Error("Invalid calendar date.");
    }

    // PREVENT PAST DATES
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new Error("Cannot select a past date.");
    }

    // VALIDATE TIME FORMAT
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

    if (!timePattern.test(start_time) || !timePattern.test(end_time)) {
        throw new Error("Invalid time format.");
    }

    // VALIDATE TIME RANGE
    if (start_time >= end_time) {
        throw new Error("End time must be later than start time.");
    }
};

// GET ALL AVAILABILITY
export const fetchAvailability = async () => {
    return await doctorAvailability.getAllAvailability();
};

// GET ALL DOCTORS
export const fetchDoctors = async () => {
    return await doctorAvailability.getAllDoctors();
};

// GET ALL HEALTH SERVICES
export const fetchHealthServices = async () => {
    return await doctorAvailability.getAllHealthServices();
};

// CREATE AVAILABILITY
export const createAvailability = async (data) => {
    validateSchedule(data);

    const conflict = await doctorAvailability.checkConflict(
        data.doctor_name,
        data.available_date,
        data.start_time,
        data.end_time
    );

    if (conflict) {
        throw new Error("Doctor already has a conflicting schedule.");
    }

    return await doctorAvailability.addAvailability(data);
};

// UPDATE AVAILABILITY
export const editAvailability = async (id, data) => {
    const existing = await doctorAvailability.getAvailabilityById(id);

    if (!existing) {
        throw new Error("Availability record not found.");
    }

    // Existing schedules may not have a service_id yet.
    validateSchedule(data, false);

    if (!["Available", "Unavailable"].includes(data.status)) {
        throw new Error("Invalid availability status.");
    }

    const conflict = await doctorAvailability.checkConflict(
        data.doctor_name,
        data.available_date,
        data.start_time,
        data.end_time,
        id
    );

    if (conflict && data.status === "Available") {
        throw new Error("Doctor already has a conflicting schedule.");
    }

    return await doctorAvailability.updateAvailability(id, data);
};