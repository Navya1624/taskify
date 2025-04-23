import mongoose from "mongoose";

const dailyTaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      taskName: {
        type: String,
        required: true,
      },
      allottedTime: {
        type: String, // Format: "HH:MM AM/PM"
        required: true,
      },
      priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
      },
      status: {
        type: String,
        enum: ["Pending", "In Progress" ,"Completed"],
        default: "Pending",
      },
      date: {
        type: Date,
        default: Date.now,
      }
},{ timestamps: true });
export const DailyTask = mongoose.model("DailyTask", dailyTaskSchema);