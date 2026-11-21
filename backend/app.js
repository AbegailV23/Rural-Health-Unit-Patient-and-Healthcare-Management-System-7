import express from "express";
import cors from "cors";
import medicineRoutes from "./routes/medicineRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorAvailabilityRoutes from "./routes/doctorAvailabilityRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/medicine", medicineRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/availability", doctorAvailabilityRoutes);
app.use("/medical-records", medicalRecordRoutes);
app.use("/medical-records", medicalRecordRoutes);

app.get("/", (req, res) => {
    res.send("Municipal Health Center API is running.");
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});