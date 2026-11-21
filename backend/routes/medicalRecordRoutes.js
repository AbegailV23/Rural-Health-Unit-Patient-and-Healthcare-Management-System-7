
import express from "express";
import * as medicalRecordController from "../controllers/medicalRecordController.js";

const router = express.Router();

// Kunin lahat ng medical records
router.get("/all", medicalRecordController.getAllRecords);

// Kunin ang records ng isang patient
router.get("/patient/:patientId", medicalRecordController.getRecordsByPatient);

// Magdagdag ng medical record
router.post("/add", medicalRecordController.addRecord);

// I-update ang medical record
router.put("/update/:id", medicalRecordController.updateRecord);

export default router;
