import mongoose from "mongoose";
const reminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    dueTime: {
        type: String, // or Date if you want full control with time component
        required: false,
    },
    completionStatus: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reminderSent: {
        type: Boolean,
        default: false, // helpful when you implement email logic later
    }
});
export const Reminder = mongoose.model('Reminder', reminderSchema);