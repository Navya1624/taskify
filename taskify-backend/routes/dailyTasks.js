import express from "express";
import { DailyTask } from "../models/dailyTasks.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add",authenticateToken,async(req,res)=>{
    try{
        const { taskName, allottedTime, priority, status } = req.body;
        if (!taskName && !allottedTime ) {
            return res.status(400).send("User, Title, and Time are required");
        }
        const task = new DailyTask({ userId: req.userId , taskName, allottedTime, priority, status });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})
router.delete("/delete/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      await DailyTask.findByIdAndDelete(taskId);
      res.status(200).send("Task deleted");
    } catch (err) {
      res.status(500).send("Server error");
    }
  });
  router.get("/tasks",authenticateToken, async (req, res) => {
    try {
      const tasks = await DailyTask.find({ userId: req.userId }).sort({ date: -1 });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).send("Server error");
    }
  });

  router.put("/edit/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const updates = req.body;
      const updatedTask = await DailyTask.findByIdAndUpdate(taskId, updates, { new: true });
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).send("Server error");
    }
});
export default router;