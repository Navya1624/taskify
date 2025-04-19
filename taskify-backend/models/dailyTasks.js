import mongoose from "mongoose";

const dailyTaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: String,
      time: {
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
        enum: ["Pending", "Progress" ,"Completed"],
        default: "Pending",
      },
      date: {
        type: Date,
        default: Date.now,
      }
},{ timestamps: true });
export const DailyTask = mongoose.model("DailyTask", dailyTaskSchema);