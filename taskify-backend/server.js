import authenticationRoutes from "./routes/authentication.js";
import DailyTaskRoutes from "./routes/dailyTasks.js";
import PlannerRoutes from "./routes/planner.js"
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true,               // allow cookies to be sent
  }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("MongoDB connection error:",err));

app.use('/api/auth',authenticationRoutes);
app.use('/api/dailyTasks',DailyTaskRoutes);
app.use('/api/planner',PlannerRoutes);

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})