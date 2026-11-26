import db from "../config/db.js";

// GET ALL DOCTORS
export const getAllDoctors = async () => {
    const [rows] = await db.query(
        `SELECT doctor_id, doctor_name
         FROM doctor
         ORDER BY doctor_name ASC`
    );

    return rows;
};

// GET ALL HEALTH SERVICES
export const getAllHealthServices = async () => {
    const [rows] = await db.query(
        `SELECT service_id, service_name
         FROM health_service
         ORDER BY service_name ASC`
    );

    return rows;
};

// GET ALL DOCTOR AVAILABILITY
export const getAllAvailability = async () => {
    const [rows] = await db.query(
        `SELECT
            da.id,
            da.doctor_name,
            da.service_id,
            hs.service_name,
            da.available_date,
            da.start_time,
            da.end_time,
            da.status,
            da.created_at
         FROM doctor_availability da
         LEFT JOIN health_service hs
         ON da.service_id = hs.service_id
         ORDER BY da.available_date ASC, da.start_time ASC`
    );

    return rows;
};

// GET AVAILABILITY BY ID
export const getAvailabilityById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM doctor_availability
         WHERE id = ?`,
        [id]
    );

    return rows[0];
};

// CHECK CONFLICTING SCHEDULE
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

// ADD DOCTOR AVAILABILITY
export const addAvailability = async (data) => {
    const {
        doctor_name,
        service_id,
        available_date,
        start_time,
        end_time
    } = data;

    const [result] = await db.query(
        `INSERT INTO doctor_availability
        (doctor_name, service_id, available_date, start_time, end_time)
        VALUES (?, ?, ?, ?, ?)`,
        [
            doctor_name,
            service_id,
            available_date,
            start_time,
            end_time
        ]
    );

    return result;
};

// UPDATE DOCTOR AVAILABILITY
export const updateAvailability = async (id, data) => {
    const {
        doctor_name,
        service_id,
        available_date,
        start_time,
        end_time,
        status
    } = data;

    const [result] = await db.query(
        `UPDATE doctor_availability
         SET doctor_name = ?,
             service_id = ?,
             available_date = ?,
             start_time = ?,
             end_time = ?,
             status = ?
         WHERE id = ?`,
        [
            doctor_name,
            service_id,
            available_date,
            start_time,
            end_time,
            status,
            id
        ]
    );

    return result;
};