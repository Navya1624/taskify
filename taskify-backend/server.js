import authenticationRoutes from "./routes/authentication.js";
import DailyTaskRoutes from "./routes/dailyTasks.js"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("MongoDB connection error:",err));

app.use('/api/auth',authenticationRoutes);
app.use('/api/dailyTasks',DailyTaskRoutes);

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})