
import express from "express";
import * as availabilityController from "../controllers/doctorAvailabilityController.js";

const router = express.Router();

router.get("/all", availabilityController.getAvailability);
router.post("/add", availabilityController.createAvailability);
router.put("/update/:id", availabilityController.updateAvailability);

export default router;
