
import pool from "../config/db.js";

// GET ALL APPOINTMENTS
// Kinukuha ang lahat ng follow-up appointments.
export const getAllAppointments = async () => {
    const [rows] = await pool.query(
        `SELECT * FROM follow_up_appointments
         ORDER BY scheduled_date ASC, appointment_time ASC`
    );

    return rows;
};

// FIND APPOINTMENT BY ID
// Hinahanap ang appointment gamit ang follow_up_id.
export const findAppointmentById = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM follow_up_appointments
         WHERE follow_up_id = ?`,
        [id]
    );

    return rows[0];
};

// CHECK DUPLICATE APPOINTMENT
// Sinusuri kung may kaparehong patient ID,
// date, at time sa database.
export const checkDuplicateAppointment = async (
    patient_id,
    scheduled_date,
    appointment_time,
    excludeId = null
) => {
    let sql = `
        SELECT * FROM follow_up_appointments
        WHERE patient_id = ?
        AND scheduled_date = ?
        AND appointment_time = ?
    `;

    const values = [
        patient_id,
        scheduled_date,
        appointment_time
    ];

    // Ginagamit kapag nag-u-update ng appointment.
    if (excludeId !== null) {
        sql += " AND follow_up_id != ?";
        values.push(excludeId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
};

// COUNT APPOINTMENTS PER DAY
// Binibilang kung ilan na ang appointments sa isang araw.
export const countAppointmentsByDate = async (scheduled_date) => {
    const [rows] = await pool.query(
        `SELECT COUNT(*) AS total
         FROM follow_up_appointments
         WHERE scheduled_date = ?`,
        [scheduled_date]
    );

    return Number(rows[0].total);
};

// ADD APPOINTMENT
// Nagse-save ng bagong follow-up appointment.
export const insertAppointment = async (appointment) => {
    const {
        patient_id,
        patient_name,
        scheduled_date,
        appointment_time,
        reason
    } = appointment;

    const [result] = await pool.query(
        `INSERT INTO follow_up_appointments
        (patient_id, patient_name, scheduled_date, appointment_time, reason)
        VALUES (?, ?, ?, ?, ?)`,
        [
            patient_id,
            patient_name,
            scheduled_date,
            appointment_time,
            reason
        ]
    );

    return result.insertId;
};

// UPDATE APPOINTMENT
// Ina-update ang existing appointment details.
export const updateAppointment = async (id, appointment) => {
    const {
        patient_id,
        patient_name,
        scheduled_date,
        appointment_time,
        reason
    } = appointment;

    const [result] = await pool.query(
        `UPDATE follow_up_appointments
         SET patient_id = ?,
             patient_name = ?,
             scheduled_date = ?,
             appointment_time = ?,
             reason = ?
         WHERE follow_up_id = ?`,
        [
            patient_id,
            patient_name,
            scheduled_date,
            appointment_time,
            reason,
            id
        ]
    );

    return result.affectedRows;
};
