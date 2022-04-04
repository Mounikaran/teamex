import Project from "../models/project.js";

export const getProjects = async (req, res) => {
    const projects = await Project.find({});
    res.status(200).json(projects);
}

export const createProject = async (req, res) => {
    const { title, description } = req.body;
    const project = new Project({ title, description });
    try {
        await project.save();
        res.status(201).json(project);
    }  catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        res.status(200).json(project);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;
    try {
        const project = await Project.findByIdAndUpdate(id, { ...dataToUpdate }, { new: true });
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: "Project deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}