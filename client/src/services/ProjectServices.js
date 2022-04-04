import React from 'react';
import {
    getAllProjects,
    filterTasks,
    getProjectById
} from '../api/index'

export const fetchAllProjects = async () => {
    console.log("calling fetchAllProjects");
    const projects = await getAllProjects();
    setToLocal('projects', projects.data, true);
}

export const fetchProject = async (id) => {
    console.log('calling fetchProject');
    const project = await getProjectById(id);
    return project.data;
}

export const fetchTasks = async (filterData) => {
    console.log("Getting tasks API")
    const tasks = await filterTasks(filterData)
    return tasks.data
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
        return item ? JSON.parse(item) : null;
    }else{
        return item ? item : null;
    }
}