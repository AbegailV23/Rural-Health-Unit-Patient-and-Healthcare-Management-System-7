
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
