
import * as availabilityService from "../services/doctorAvailabilityService.js";

export const getAvailability = async (req, res) => {
    try {
        const result = await availabilityService.fetchAvailability();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAvailability = async (req, res) => {
    try {
        const result = await availabilityService.createAvailability(req.body);

        res.status(201).json({
            message: "Doctor availability added successfully.",
            id: result.insertId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const result = await availabilityService.editAvailability(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Doctor availability updated successfully.",
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
