import mongoose from "mongoose";
const plannerSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    kanbanBoard: {
        type: Array,
        default: [],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {timestamps : true});

export const Planner = mongoose.model('Planner', plannerSchema)