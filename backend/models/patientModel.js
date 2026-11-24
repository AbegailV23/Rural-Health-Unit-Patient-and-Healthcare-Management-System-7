import pool from '../config/db.js';

// Retrieve doctor schedules
export const fetchDoctorSchedules = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM doctor_schedule"
    );

    return rows;
};

// Retrieve existing appointments
export const fetchAppointments = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM appointment"
    );

    return rows;
};