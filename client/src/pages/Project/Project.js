import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./project.scss";
import * as projectService from "../../services/ProjectServices";
import ProjectDetail from "../../components/Project";
import CreateProject from "../../components/Project/CreateProject";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [taskStatusList, setTaskStatusList] = useState();

  const [isProjectSaved, setIsProjectSaved] = useState(false);
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);
  const [isProjectUpdated, setIsProjectUpdated] = useState(false);

  const [isTaskUpdated, setIsTaskUpdated] = useState(false);

  const [showCreateProject, setShowCreateProject] = useState(false);

  const [selectedProject, setSelectedProject] = useState({
    id: null,
  });

  const fetchProjectsAPI = async () => {
    const projectsResp = await projectService.fetchAllProjects();
    setProjects(projectsResp);
  };

  const fetchProjectAPI = async (id) => {
    setSelectedProject({ id: id });
    const projectResp = await projectService.fetchProject(id);
    setProject(projectResp);
  };
  // get tasks status list
  const fetchTaskStatusList = async () => {
    const taskStatusList = await projectService.getTaskStatusList();
    setTaskStatusList(taskStatusList.taskStatus);
  };
  useEffect(() => {
    fetchTaskStatusList();
  }, []);

  // get tasks
  const fetchTasksAPI = async (filterData) => {
    const taskResp = await projectService.fetchTasks(filterData);
    setTasks(taskResp);
  };
  
  // update Task
  const updateTaskAPI = async (id, task) => {
    const updateResp = await projectService.editTask(id, task);
    if(updateResp.status === 200) {
      setIsTaskUpdated(true);
    }
    return updateResp;
  }

  useEffect(() => {
    if(isTaskUpdated) {
      setTasks(null)
      fetchTasksAPI({ projectId: selectedProject.id });
      setIsTaskUpdated(false);
    }
  }, [isTaskUpdated]);

  useEffect(() => {
    fetchProjectsAPI();
    if (isProjectSaved) setIsProjectSaved(false);
    if (isProjectDeleted) setIsProjectDeleted(false);
    if (isProjectUpdated) {
      fetchProjectAPI(selectedProject.id);
      setIsProjectUpdated(false);
    }
  }, [isProjectSaved, isProjectDeleted, isProjectUpdated]);

  const handleCreateProject = async () => {
    console.log("Create project clicked");
    setProject(null);
    setSelectedProject({
      id: null,
    });
    setShowCreateProject(!showCreateProject);
  };

  const handleProjectClick = (id) => {
    setProject(null);
    setShowCreateProject(false);
    fetchProjectAPI(id);
    fetchTasksAPI({ projectId: id });
  };

  return (
    <div className="project">
      <Sidebar />
      <Container maxWidth="lg">
        <Grid container spacing={1} style={{ paddingTop: 10 }}>
          <Grid item xs={3}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  aria-label="add"
                  variant="contained"
                  color="primary"
                  onClick={handleCreateProject}
                >
                  <AddCircleRoundedIcon />
                </Button>
              </Grid>
              {projects &&
                projects.map((project) => (
                  <Grid item xs={12} key={project._id}>
                    <Paper
                      elevation={1}
                      className={`project-list-item hoverable ${
                        selectedProject?.id === project._id ? "selected" : ""
                      }`}
                      onClick={() => {
                        handleProjectClick(project._id);
                      }}
                    >
                      <p>{project.title}</p>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={9}>
            {project && (
              <div className="project-body">
                <ProjectDetail
                  project={project}
                  projectTasks={tasks}
                  setIsDeleted={setIsProjectDeleted}
                  setIsUpdated={setIsProjectUpdated}
                  taskStatusList={taskStatusList}
                  updateTask={updateTaskAPI}
                />
              </div>
            )}
            {showCreateProject && (
              <div className="project-body">
                <CreateProject
                  setIsProjectSaved={setIsProjectSaved}
                  isProjectSaved={isProjectSaved}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Project;
