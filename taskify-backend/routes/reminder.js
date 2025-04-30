import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import { addReminder ,deleteReminder,getReminderById,getReminderByDate,editReminder,getReminderByMonth,getAllReminders} from "../controller/reminderController.js";
import { get } from "mongoose";

const router=express.Router();
router.use(cookieParser());
router.use(express.json());

router.post("/add",authenticateToken,addReminder);
router.get("/show/:reminderId",authenticateToken,getReminderById);
router.put("/edit/:reminderId",authenticateToken,editReminder);
router.delete("/delete/:reminderId",authenticateToken,deleteReminder);
router.get("/by-date/:date",authenticateToken,getReminderByDate);
router.get("/getAll",authenticateToken,getAllReminders);
router.get("/by-month/:year/:month",authenticateToken,getReminderByMonth);

export default router;