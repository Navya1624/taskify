import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { Planner } from "../models/planner.js";

const deletePlanner = async (req, res) => {
    try {
        const { plannerId } = req.params;
        await Planner.findByIdAndDelete(plannerId);
        res.status(200).send("Plan deleted");
    } catch (err) {
        res.status(500).send("Server error");
    }
};

const getPlanById = async(req,res)=>{
    try{
        const {plannerId} = req.params;
        const plans = await Planner.find({ userId: req.userId ,_id:plannerId});
        res.status(200).json({plans});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}
const updatePlanner = async (req, res) => {
    try {
      const { plannerId } = req.params;
      const { title, description } = req.body; // Corrected typo
  
      // Optional: Authorization check
      const planner = await Planner.findById(plannerId);
      if (!planner) {
        return res.status(404).send("Planner not found");
      }
      if (planner.userId.toString() !== req.userId) {
        return res.status(403).send("Unauthorized to update this planner");
      }
  
      const updatedPlan = await Planner.findByIdAndUpdate(
        { _id: plannerId },
        { title, description },
        { new: true }
      );
      res.status(200).json(updatedPlan);
    } catch (err) {
      console.error("Error updating planner:", err);
      res.status(500).send("Server error");
    }
  };
export {deletePlanner,updatePlanner,getPlanById};