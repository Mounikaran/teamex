import { Card, Container, Grid, Paper } from "@material-ui/core";
import { Icon } from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./project.scss";
import * as projectService from "../../services/ProjectServices";
import ProjectDetail from "../../components/Project";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);

  const [selectedProject, setSelectedProject] = useState({
      id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      await projectService.fetchAllProjects();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (projects < 1) {
      const projects = projectService.getFromLocal("projects", true);
      setProjects(projects);
    }
  }, [projects]);

  const handleCreateProject = async () => {
      console.log("Create project clicked");
  }

  const handleProjectClick = async (id) => {
    
    setSelectedProject({id:id});

    const project = await projectService.fetchProject(id);
    if (project) {
      setProject(project);
    }

    const filterData = { projectId: id };
    const tasksResp = await projectService.fetchTasks(filterData);
    if (tasksResp) {
      setTasks(tasksResp);
    }
  };

  return (
    <div className="project">
      <Sidebar />
      <Container maxWidth="lg">
        <Grid container spacing={1} style={{paddingTop: 10}}>
          <Grid item xs={3}>
            <Grid container spacing={1}>
              {projects &&
                projects.map((project) => (
                  <Grid item xs={12} key={project._id}>
                    <Paper
                      elevation={1}
                      className={`project-list-item hoverable ${selectedProject?.id === project._id ? 'selected' : ''}`}
                      onClick={() => {
                        handleProjectClick(project._id);
                      }}
                    >
                      <p>{project.title}</p>
                    </Paper>
                  </Grid>
                ))}
                <Grid item xs={12} key={project._id}>
                    <Paper
                      variant="outlined"
                      onClick={() => {
                        handleCreateProject();
                      }}
                    >
                      <Icon color="primary">add_circle</Icon>
                    </Paper>
                  </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            {project && (
              <div className="project-body">
                <ProjectDetail project={project} tasks={tasks} />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Project;
