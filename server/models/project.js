import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }, 
    timestamp: {
        type: Date,
        default: new Date()
    }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
