
import * as appointmentModel from '../models/appointmentModel.js';

// Fetch and organize appointments
export const fetchAllAppointments = async (selectedDate) => {

    const appointments =
        await appointmentModel.fetchAllAppointments(selectedDate);

    return appointments;
};
