import * as patientController from '../controllers/patientController.js';
import express from "express";

const patientRoutes = express.Router();

// Retrieve available appointment slots
patientRoutes.get('/available-slots', patientController.fetchAvailableSlots);

export default patientRoutes;