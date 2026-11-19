
import db from "../config/db.js";

// 1. RETRIEVE ALL DOCTOR AVAILABILITY
export const getAllAvailability = async () => {
    const [rows] = await db.query(
        `SELECT
            id,
            doctor_name,
            available_date,
            start_time,
            end_time,
            status,
            created_at
         FROM doctor_availability
         ORDER BY available_date ASC, start_time ASC`
    );

    return rows;
};

// 2. RETRIEVE DOCTOR AVAILABILITY BY ID
export const getAvailabilityById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM doctor_availability
         WHERE id = ?`,
        [id]
    );

    return rows[0];
};

// 3. CHECK CONFLICTING SCHEDULE
export const checkConflict = async (
    doctor_name,
    available_date,
    start_time,
    end_time,
    excludeId = null
) => {
    const [rows] = await db.query(
        `SELECT id FROM doctor_availability
         WHERE doctor_name = ?
         AND available_date = ?
         AND status = 'Available'
         AND start_time < ?
         AND end_time > ?
         AND id != ?`,
        [
            doctor_name,
            available_date,
            end_time,
            start_time,
            excludeId || 0
        ]
    );

    return rows.length > 0;
};

// 4. CREATE DOCTOR AVAILABILITY
export const addAvailability = async (data) => {
    const {
        doctor_name,
        available_date,
        start_time,
        end_time
    } = data;

    const [result] = await db.query(
        `INSERT INTO doctor_availability
        (doctor_name, available_date, start_time, end_time)
        VALUES (?, ?, ?, ?)`,
        [
            doctor_name,
            available_date,
            start_time,
            end_time
        ]
    );

    return result;
};

// 5. UPDATE DOCTOR AVAILABILITY
export const updateAvailability = async (id, data) => {
    const {
        doctor_name,
        available_date,
        start_time,
        end_time,
        status
    } = data;

    const [result] = await db.query(
        `UPDATE doctor_availability
         SET doctor_name = ?,
             available_date = ?,
             start_time = ?,
             end_time = ?,
             status = ?
         WHERE id = ?`,
        [
            doctor_name,
            available_date,
            start_time,
            end_time,
            status,
            id
        ]
    );

    return result;
};
