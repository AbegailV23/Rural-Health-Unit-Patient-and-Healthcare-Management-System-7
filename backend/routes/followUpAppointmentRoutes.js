
import express from "express";

import {
    getFollowUpAppointments,
    addFollowUpAppointment,
    updateFollowUpAppointment
} from "../controllers/followUpAppointmentController.js";

const router = express.Router();

// Display all appointments.
router.get("/all", getFollowUpAppointments);
// Add new appointment.
router.post("/add", addFollowUpAppointment);
// Update existing appointment.
router.put("/update/:id", updateFollowUpAppointment);

export default router;
