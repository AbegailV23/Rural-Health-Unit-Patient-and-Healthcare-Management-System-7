
import {
    getAppointmentsService,
    getDailyAppointmentsService,
    addAppointmentService,
    updateAppointmentService
} from "../services/followUpAppointmentService.js";

// GET APPOINTMENTS
export const getFollowUpAppointments = async (req, res) => {
    try {
        const appointments = await getAppointmentsService();

        res.status(200).json({
            success: true,
            data: appointments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ADD APPOINTMENT
export const addFollowUpAppointment = async (req, res) => {
    try {
        const result = await addAppointmentService(req.body);

        res.status(201).json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE APPOINTMENT
export const updateFollowUpAppointment = async (req, res) => {
    try {
        const result = await updateAppointmentService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET DAILY APPOINTMENTS
// Ipinapakita ang appointments ayon sa scheduled date.
export const getDailyFollowUpAppointments = async (req, res) => {
    try {
        // Kinukuha ang daily appointment schedules.
        const dailySchedules = await getDailyAppointmentsService();

        res.status(200).json({
            success: true,
            data: dailySchedules
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};