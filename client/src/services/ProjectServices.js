import React from 'react';
import {
    getAllProjects,
    filterTasks,
    updateTask,
    createTask,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    fetchTaskStausList
} from '../api/index'

export const fetchAllProjects = async () => {
    console.log("calling fetchAllProjects API");
    const projects = await getAllProjects();
    return projects.data;
    // setToLocal('projects', projects.data, true);
}

export const saveProject = async (project) => {
    console.log("calling createProject API");
    const saveResp = await createProject(project);
    return saveResp;
}

export const editUpdate = async(id, project) => {
    console.log("calling updateProject API");
    const updateResp = await updateProject(id, project);
    return updateResp;
}

export const removeProject = async (id) => {
    console.log("calling deleteProject API");
    const deleteResp = await deleteProject(id);
    return deleteResp;
}

export const fetchProject = async (id) => {
    console.log('calling fetchProject API');
    const project = await getProjectById(id);
    return project.data;
}

export const fetchTasks = async (filterData) => {
    console.log("Getting tasks API", filterData)
    const tasks = await filterTasks(filterData)
    return tasks.data
}

export const editTask = async (id, task) => {
    console.log("Calling updateTask API", task)
    const updateResp = await updateTask(id, task)
    return updateResp
}

export const addTask = async (task) => {
    console.log("Calling createTask API", task)
    const createResp = await createTask(task)
    return createResp
}

export const getTaskStatusList = async () => {
    console.log("Getting task status list API")
    const taskStatusList = await fetchTaskStausList()
    return taskStatusList.data
}

export const fetchTaskwithFilter = async (filterData) => {
    console.log("Gettiing Tasks API : ", filterData);
    const tasks = await filterTasks(filterData);
    return tasks.data;
}


export const setToLocal = (key, value, parse=false) => {
    if(parse){
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value);
}

export const getFromLocal = (key, parse=false) => {
    console.log("Getting from local", key)
    const item = localStorage.getItem(key);
    if (parse) {
        console.log("Data : ", JSON.parse(item))
        return item ? JSON.parse(item) : null;
    }else{
        console.log("Data : ", item)
        return item ? item : null;
    }
}