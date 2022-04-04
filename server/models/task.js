import mongoose from 'mongoose';

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
        type: String,
        required: true
    },
    assignedTo: {
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
        type: String,
        default: 'LOW'
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
