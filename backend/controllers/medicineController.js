import * as medicineService from "../services/medicineService.js";

export async function fetchAllMedicines(req, res) {
    try {
        const medicines = await medicineService.fetchAllMedicines();

        res.json(medicines);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function createMedicine(req, res) {
    try {
        await medicineService.createMedicine(req.body);

        res.status(201).json({
            message: "Medicine added successfully."
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

export async function editMedicine(req, res) {
    try {
        await medicineService.editMedicine(req.params.id, req.body);

        res.json({
            message: "Medicine updated successfully."
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

export async function editQuantity(req, res) {
    try {
        await medicineService.editQuantity(
            req.params.id,
            req.body.quantity
        );

        res.json({
            message: "Medicine quantity updated successfully."
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

export async function deleteMedicine(req, res) {
    try {
        await medicineService.removeMedicine(req.params.id);

        res.json({
            message: "Medicine deleted successfully."
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}