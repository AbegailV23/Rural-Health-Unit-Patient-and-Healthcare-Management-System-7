
import db from "../config/db.js";

// FUNCTION 1: Kunin lahat ng medical records
export const getAllMedicalRecords = async () => {
    const sql = `
        SELECT *
        FROM patient_medical_records
        ORDER BY visit_date DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
};


// FUNCTION 2: Kunin ang medical records ng isang patient
export const getRecordsByPatient = async (patientId) => {
    const sql = `
        SELECT *
        FROM patient_medical_records
        WHERE patient_id = ?
        ORDER BY visit_date DESC
    `;

    const [rows] = await db.query(sql, [patientId]);
    return rows;
};


// FUNCTION 3: Tingnan kung existing ang patient
export const checkPatient = async (patientId) => {
    const sql = `
        SELECT patient_id
        FROM patient
        WHERE patient_id = ?
    `;

    const [rows] = await db.query(sql, [patientId]);

    return rows.length > 0;
};


// FUNCTION 4: Mag-save ng bagong medical record
export const createMedicalRecord = async (data) => {
    const sql = `
        INSERT INTO patient_medical_records
        (
            patient_id,
            visit_date,
            blood_pressure,
            temperature,
            weight,
            height,
            symptoms,
            diagnosis,
            treatment,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.patient_id,
        data.visit_date,
        data.blood_pressure,
        data.temperature,
        data.weight,
        data.height,
        data.symptoms,
        data.diagnosis,
        data.treatment,
        data.notes
    ];

    const [result] = await db.query(sql, values);

    return result.insertId;
};


// FUNCTION 5: I-update ang existing medical record
export const updateMedicalRecord = async (id, data) => {
    const sql = `
        UPDATE patient_medical_records
        SET
            visit_date = ?,
            blood_pressure = ?,
            temperature = ?,
            weight = ?,
            height = ?,
            symptoms = ?,
            diagnosis = ?,
            treatment = ?,
            notes = ?
        WHERE record_id = ?
    `;

    const values = [
        data.visit_date,
        data.blood_pressure,
        data.temperature,
        data.weight,
        data.height,
        data.symptoms,
        data.diagnosis,
        data.treatment,
        data.notes,
        id
    ];

    const [result] = await db.query(sql, values);

    return result.affectedRows;
};

// FUNCTION 6: Maghanap ng patient gamit ang ID o pangalan
export const searchPatients = async (keyword) => {
    const sql = `
        SELECT
            patient_id,
            first_name,
            middle_name,
            last_name,
            birth_date,
            gender,
            address,
            contact_number
        FROM patient
        WHERE
            CAST(patient_id AS CHAR) LIKE ?
            OR first_name LIKE ?
            OR middle_name LIKE ?
            OR last_name LIKE ?
            OR CONCAT(first_name, ' ', last_name) LIKE ?
            OR CONCAT(first_name, ' ', middle_name, ' ', last_name) LIKE ?
        ORDER BY last_name ASC
        LIMIT 20
    `;

    const searchValue = `%${keyword}%`;

    const [rows] = await db.query(sql, [
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue
    ]);

    return rows;
};