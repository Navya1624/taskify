import express from "express";
import { Reminder } from "../models/reminder.js";

const addReminder = async(req,res)=>{
    try{
        const userId = req.userId;
        const {title,dueDate ,dueTime} = req.body;
        const reminder = new Reminder({title,userId,dueDate,dueTime});
        await reminder.save();
        res.status(201).json(reminder);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

const deleteReminder = async(req,res)=>{
    try{
        const {reminderId} = req.params;
        await Reminder.findByIdAndDelete(reminderId);
        res.status(200).send("Reminder deleted");
    }catch(error){
        res.status(500).send("Server error");
    }
}

const getReminderById = async(req,res)=>{
    try{
        const {reminderId} =req.params;
        const reminder = await Reminder.findById({_id:reminderId});
        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.status(200).json({reminder});
    }catch(error){
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid Reminder ID format" });
        }
        res.status(500).json({message: "Server error"});
    }
}
const editReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const { title, dueDate, dueTime } = req.body;
        const updatedReminder = await Reminder.findByIdAndUpdate(
            reminderId, 
            { title, dueDate, dueTime },
            { new: true }
        );
        if (!updatedReminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.status(200).json({ reminder: updatedReminder }); // Send the updated reminder in the response
    } catch (error) {
        console.error("Error updating reminder:", error); // Corrected error message and variable
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid Reminder ID format" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};
const getReminderByMonth = async (req, res) => {
    try {
        const { month, year } = req.params;
        const userId = req.userId;

        // Month in JavaScript Date is 0-indexed (0 for January, 11 for December)
        const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endOfMonth = new Date(parseInt(year), parseInt(month), 0); // Day 0 of the next month gives the last day of the current month

        const reminders = await Reminder.find({
            userId: userId,
            dueDate: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        });

        res.status(200).json({ reminders });
    } catch (error) {
        console.error("Error fetching reminders by month:", error);
        res.status(500).json({ message: "Server error while fetching reminders by month" });
    }
};
const getAllReminders = async (req, res) => {
    try {
        const userId = req.userId;
        const reminders = await Reminder.find({ userId: userId });
        console.log(reminders);
        res.status(200).json({ reminders });
    } catch (error) {
        console.error("Error fetching all reminders:", error);
        res.status(500).json({ message: "Server error while fetching all reminders" });
    }
};
const getReminderByDate= async(req,res)=>{
    try{
        const {date}=req.params;
        const userId=req.userId;

        const startOfDay= new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate()+1);
        endOfDay.setMilliseconds(endOfDay.getMilliseconds()-1);

        const reminders = await Reminder.find({
            userId:userId,
            dueDate:{
                $gte: startOfDay,
                $lt:endOfDay,
            },
        })
        res.status(200).json({ reminders });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error while fetching reminders by date" });
    }
}
export {addReminder,deleteReminder,getReminderById,getReminderByDate,editReminder,getReminderByMonth,getAllReminders};