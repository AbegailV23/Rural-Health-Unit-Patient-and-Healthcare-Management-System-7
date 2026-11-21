
import * as medicalRecordModel from "../models/medicalRecordModel.js";

// Kunin lahat ng records
export const fetchAllRecords = async () => {
    return await medicalRecordModel.getAllMedicalRecords();
};

// Kunin ang records ng isang patient
export const fetchRecordsByPatient = async (patientId) => {
    if (!patientId || isNaN(patientId)) {
        throw new Error("Invalid patient ID");
    }

    return await medicalRecordModel.getRecordsByPatient(patientId);
};

// Magdagdag ng medical record
export const addMedicalRecord = async (data) => {
    // Check kung may patient ID
    if (!data.patient_id || !data.visit_date) {
        throw new Error("Patient ID and visit date are required");
    }

    // Check kung existing ang patient
    const patientExists = await medicalRecordModel.checkPatient(
        data.patient_id
    );

    if (!patientExists) {
        throw new Error("Patient not found");
    }

    // I-save ang record
    return await medicalRecordModel.createMedicalRecord(data);
};

// I-update ang medical record
export const editMedicalRecord = async (id, data) => {
    // Check kung may record ID
    if (!id || isNaN(id)) {
        throw new Error("Invalid record ID");
    }

    // I-update ang record
    const result = await medicalRecordModel.updateMedicalRecord(id, data);

    if (result === 0) {
        throw new Error("Medical record not found");
    }

    return "Medical record updated successfully";
};

// FUNCTION: Search patient
export const searchPatientRecords = async (keyword) => {
    if (!keyword || !keyword.trim()) {
        throw new Error("Please enter a patient name or ID.");
    }

    return await medicalRecordModel.searchPatients(keyword.trim());
};