import * as patientService from '../services/patientService.js';

// Retrieve available appointment slots
export const fetchAvailableSlots = async (req, res) => {

    try {

        const slots = await patientService.fetchAvailableSlots();

        res.status(200).json(slots);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });

    }

};