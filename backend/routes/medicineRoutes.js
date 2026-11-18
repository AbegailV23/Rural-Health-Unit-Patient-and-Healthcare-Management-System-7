import express from "express";
import * as medicineController from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", medicineController.fetchAllMedicines);
router.post("/", medicineController.createMedicine);
router.put("/:id", medicineController.editMedicine);
router.patch("/:id/quantity", medicineController.editQuantity);
router.delete("/:id", medicineController.deleteMedicine);

export default router;