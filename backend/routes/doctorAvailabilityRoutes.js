import express from "express";

import * as availabilityController from "../controllers/doctorAvailabilityController.js";

const router = express.Router();

// GET ALL DOCTORS
router.get("/doctors", availabilityController.getDoctors);

// GET ALL HEALTH SERVICES
router.get("/health-services", availabilityController.getHealthServices);

// GET ALL AVAILABILITY
router.get("/all", availabilityController.getAvailability);

// ADD AVAILABILITY
router.post("/add", availabilityController.createAvailability);

// UPDATE AVAILABILITY
router.put("/update/:id", availabilityController.updateAvailability);

export default router;