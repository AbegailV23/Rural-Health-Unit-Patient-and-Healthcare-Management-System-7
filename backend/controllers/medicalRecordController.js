
import * as medicalRecordService from "../services/medicalRecordService.js";

// Kunin lahat ng medical records
export const getAllRecords = async (req, res) => {
    try {
        const records = await medicalRecordService.fetchAllRecords();

        res.status(200).json(records);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Kunin ang records ng isang patient
export const getRecordsByPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        const records = await medicalRecordService.fetchRecordsByPatient(patientId);

        res.status(200).json(records);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Magdagdag ng medical record
export const addRecord = async (req, res) => {
    try {
        const recordData = req.body;

        const newRecord = await medicalRecordService.addMedicalRecord(recordData);

        res.status(201).json({
            message: "Medical record added successfully",
            record_id: newRecord
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// I-update ang medical record
export const updateRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const recordData = req.body;

        const result = await medicalRecordService.editMedicalRecord(
            recordId,
            recordData
        );

        res.status(200).json({ message: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
