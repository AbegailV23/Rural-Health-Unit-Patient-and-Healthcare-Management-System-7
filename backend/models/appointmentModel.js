
import pool from '../config/db.js';

// Read all appointments
export const fetchAllAppointments = async () => {

    const [rows] = await pool.query(
        `SELECT
            id,
            patient_name,
            appointment_date,
            appointment_time,
            status
        FROM appointment`
    );

    return rows;
};
