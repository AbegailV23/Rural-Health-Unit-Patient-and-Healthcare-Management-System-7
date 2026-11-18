import * as medicineModel from "../models/medicineModel.js";
import ValidationError from "../utils/ValidationError.js";

export async function fetchAllMedicines() {
    return await medicineModel.fetchAllMedicines();
}

export async function createMedicine(medicine) {
    const { name, category, quantity, expiration, description } = medicine;

    if (!name || !category || quantity === "" || quantity === undefined || !expiration) {
        throw new ValidationError("Please complete all required fields.", 400);
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
        throw new ValidationError("Quantity must be a non-negative whole number.", 400);
    }

    return await medicineModel.insertMedicine({
        name,
        category,
        quantity: Number(quantity),
        expiration,
        description: description || ""
    });
}

export async function editMedicine(id, medicine) {
    const existingMedicine = await medicineModel.findMedicineById(id);

    if (existingMedicine.length === 0) {
        throw new ValidationError("Medicine not found.", 404);
    }

    const { name, category, quantity, expiration, description } = medicine;

    if (!name || !category || quantity === "" || quantity === undefined || !expiration) {
        throw new ValidationError("Please complete all required fields.", 400);
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
        throw new ValidationError("Invalid medicine quantity.", 400);
    }

    return await medicineModel.updateMedicine(id, {
        name,
        category,
        quantity: Number(quantity),
        expiration,
        description: description || ""
    });
}

export async function editQuantity(id, quantity) {
    const existingMedicine = await medicineModel.findMedicineById(id);

    if (existingMedicine.length === 0) {
        throw new ValidationError("Medicine not found.", 404);
    }

    if (
        quantity === undefined ||
        !Number.isInteger(Number(quantity)) ||
        Number(quantity) < 0
    ) {
        throw new ValidationError("Invalid medicine quantity.", 400);
    }

    return await medicineModel.updateMedicineQuantity(id, Number(quantity));
}

export async function removeMedicine(id) {
    const existingMedicine = await medicineModel.findMedicineById(id);

    if (existingMedicine.length === 0) {
        throw new ValidationError("Medicine not found.", 404);
    }

    return await medicineModel.deleteMedicine(id);
}