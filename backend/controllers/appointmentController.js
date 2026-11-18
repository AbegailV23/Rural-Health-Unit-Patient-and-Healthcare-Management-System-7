
import * as appointmentService from '../services/appointmentService.js';

export const fetchAllAppointments = async (req, res) => {

    try {

        const appointments =
            await appointmentService.fetchAllAppointments();

        res.status(200).json(appointments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
