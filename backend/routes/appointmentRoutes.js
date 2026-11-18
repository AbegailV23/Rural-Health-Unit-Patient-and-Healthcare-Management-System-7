
import * as appointmentController from '../controllers/appointmentController.js';
import express from "express";

const appointmentRoutes = express.Router();

appointmentRoutes.get('/all', appointmentController.fetchAllAppointments);

export default appointmentRoutes;
