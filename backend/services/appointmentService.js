
import * as appointmentModel from '../models/appointmentModel.js';

export const fetchAllAppointments = async () => {

    const appointments =
        await appointmentModel.fetchAllAppointments();

    return appointments;
};
