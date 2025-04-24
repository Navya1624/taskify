import express from "express";
import {Planner} from "../models/planner.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const router=express.Router();
router.use(cookieParser());
router.use(express.json());

router.post("/add",authenticateToken,async(req,res)=>{
    try{
        const {title ,description } = req.body;
        if(!title || !description){
            return res.status(400).json({
                message:"Missing title or description"
            })
        }
        const newPlan = await Planner.create({
            title,
            description,
            userId: req.userId,
            kanbanBoard: [],
        });
        res.status(201).json({ message: "Plan created", plan: newPlan });
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Service error"});
    }
});

router.get("/plans",authenticateToken,async(req,res)=>{
    try{
        const plans = await Planner.find({ userId: req.userId }).sort({ date: -1 });
        res.status(200).json({plans});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Service error"});
    }
})

export default router;