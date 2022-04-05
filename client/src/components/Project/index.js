import React, { useEffect, useState } from "react";
import { Card, IconButton, Paper, TextField, Button } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { removeProject, fetchTasks } from "../../services/ProjectServices";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { editUpdate } from "../../services/ProjectServices";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import "./project.scss";

const ProjectDetail = (props) => {
  const { project, setIsDeleted, setIsUpdated } = props;
  const [tasks, setTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [activeEditContent, setActiveEditContent] = useState("TASKS");

  const [newTitle, setNewTitle] = useState(project.title);
  const [newDescription, setNewDescription] = useState(project.description);

  const fetchTasksAPI = async () => {
    console.log("Getting tasks API");
    const filterData = { projectId: project._id };
    const tasks = await fetchTasks(filterData);
    setTasks(tasks.data);
  };

  useEffect(() => {
    fetchTasksAPI();
    setShowAlert(false);
  }, [project]);

  const handleHeaderBtnClick = (activeTab) => {
    setActiveEditContent(activeTab);
  };

  const deleteProject = async () => {
    console.log("Delete project clicked");
    const delResp = await removeProject(project._id);
    if (delResp.status === 200) {
      console.log("Project deleted successfully");
      setShowAlert(true);
      setIsDeleted(true);
    }
    handleHeaderBtnClick("");
  };

  const handleUpdate = async () => {
    console.log("Update clicked");
    const newProject = {
      title: newTitle,
      description: newDescription,
    };
    const updateResp = await editUpdate(project._id, newProject);
    if (updateResp.status === 200) {
      console.log("Project updated successfully");
      setIsUpdated(true);
    }
    handleHeaderBtnClick("TASKS");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    handleHeaderBtnClick("");
  };

  const deleteConfirm = (
    <div className="delete-confirm">
      <Card className="delete-card" elevation={5}>
        <p>
          Are you sure you want to{" "}
          <span style={{ color: "#ef233c" }}>delete</span> this project?
        </p>
        <div className="button-container">
          <IconButton aria-label="yes" onClick={deleteProject}>
            <DoneRoundedIcon color="secondary" />
          </IconButton>
          <IconButton
            aria-label="no"
            onClick={() => handleHeaderBtnClick("TASKS")}
          >
            <ClearRoundedIcon color="primary" />
          </IconButton>
        </div>
      </Card>
    </div>
  );

  const updateForm = (
    <div className="update-form">
      <Card className="project-form" variant="outlined">
        <TextField
          id="project-title"
          size="small"
          fullWidth
          label="Project Title"
          variant="outlined"
          className="project-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          id="project-description"
          label="Description"
          variant="outlined"
          className="project-input"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleUpdate}
          >
            Update Project
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );

  const deleteAlert = (
    <div className="delete-alert">
      <Alert severity="success">
        <AlertTitle>Deleted</AlertTitle>
        Project deleted successfully
      </Alert>
    </div>
  );

  const mainContent = (
    <>
      <Paper className="project-header" variant="outlined">
        <h2>{project?.title}</h2>
        <div className="button-section">
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => {
              handleHeaderBtnClick("UPDATE");
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => {
              handleHeaderBtnClick("DELETE");
            }}
          >
            <HighlightOffRoundedIcon />
          </IconButton>
        </div>
      </Paper>

      {activeEditContent === "DELETE" && deleteConfirm}
      {activeEditContent === "UPDATE" && updateForm}
      {activeEditContent === "TASKS" && ""}
    </>
  );

  return <div>{showAlert ? deleteAlert : mainContent}</div>;
};

export default ProjectDetail;
