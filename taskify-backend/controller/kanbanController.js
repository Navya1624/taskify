import { KanbanTask } from "../models/kanbanTask.js";

const createTask =async (req,res)=>{
    try {
        const { title ,status,plannerId} = req.body;
        console.log("navyaa");
        console.log(plannerId);
        const task = new KanbanTask({ title,status,userId:req.userId,plannerId:plannerId });
        console.log(task);
        await task.save();
        res.status(201).json(task);
      } catch (err) {
        res.status(500).json({ message: "Server Error" });
      }
};

const getTasks = async (req,res)=>{
    try {
        const userId=req.userId;
        const {plannerId}=req.query;
        const tasks = await KanbanTask.find({ userId: userId ,plannerId:plannerId});
        res.status(200).json(tasks);
      } catch (err) {
        res.status(500).json({ message: "Server Error" });
      }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, status } = req.body;

    const updatedTask = await KanbanTask.findByIdAndUpdate(
      {_id:taskId}, // You can directly pass taskId as the first argument
      { title, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTask = async(req,res)=>{
    try{
        const {taskId} =req.params;
        await KanbanTask.findByIdAndDelete(taskId);
        res.status(200).send("Task deleted");
    }catch (err) {
        res.status(500).send("Server error");
    }
};

const getTaskById = async(req,res)=>{
    try{
        const {taskId} = req.params;
        const task=await KanbanTask.findById({_id:taskId,userId: req.userId});
        res.status(200).json({task});
    }catch{
      console.log(error);
      res.status(500).json({message: "Server error"});
    }
}

export {createTask,getTasks,updateTaskStatus,deleteTask,getTaskById};
