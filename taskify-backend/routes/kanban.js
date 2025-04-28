import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { createTask,getTasks,updateTaskStatus ,deleteTask ,getTaskById} from "../controller/kanbanController.js";
const router=express.Router();

router.post("/create",authenticateToken,createTask);
router.get("/tasks", authenticateToken, getTasks);
router.put("/update/:taskId", authenticateToken, updateTaskStatus);
router.delete("/delete/:taskId",authenticateToken,deleteTask);
router.get("/task/:taskId",authenticateToken,getTaskById);

export default router;
