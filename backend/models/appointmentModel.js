
import pool from '../config/db.js';

// Read and organize appointments
export const fetchAllAppointments = async (selectedDate) => {

    let sql = `
        SELECT
            id,
            patient_name,
            appointment_date,
            appointment_time,
            status
        FROM appointment
    `;

    const params = [];

    // Filter appointments by selected date
    if (selectedDate) {
        sql += ` WHERE appointment_date = ?`;
        params.push(selectedDate);
    }

    // Arrange by date and time
    sql += ` ORDER BY appointment_date ASC, appointment_time ASC`;

    const [rows] = await pool.query(sql, params);

    return rows;
};
