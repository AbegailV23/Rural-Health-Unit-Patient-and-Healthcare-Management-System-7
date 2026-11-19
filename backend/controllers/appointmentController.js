
import * as appointmentService from '../services/appointmentService.js';

export const fetchAllAppointments = async (req, res) => {

    try {

        // Get selected date from URL
        const selectedDate = req.query.date;


        const appointments =
            await appointmentService.fetchAllAppointments(selectedDate);

        res.status(200).json(appointments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
