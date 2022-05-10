import mongoose from 'mongoose';
import User from './user.js';

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    assignedTo: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedName: {
        type: String,
    },
    createdBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdByName: {
        type: String,
    },
    status: {
        type: String,
        default: 'TODO'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
    },
    dueDate:{
        type: Date,
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
