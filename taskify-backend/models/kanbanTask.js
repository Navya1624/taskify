import mongoose from "mongoose";

const kanbanTaskSchema = new mongoose.Schema({
    title:{type: String,required: true},
    status:{
        type: String,
        enum: ["todo","in-process","completed"],
        default:"todo",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
        index: true, 
      },
    plannerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planner',
    required: true,
    index: true, 
    },
});

export const KanbanTask =mongoose.model("KanbanTask",kanbanTaskSchema);