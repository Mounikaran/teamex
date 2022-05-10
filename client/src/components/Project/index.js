import React, { useEffect, useState } from "react";
import { Card, IconButton, Paper, TextField, Button, Grid, MenuItem, Select } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {
  removeProject,
  getTaskStatusList,
} from "../../services/ProjectServices";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { editUpdate } from "../../services/ProjectServices";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from "react-redux";


import "./project.scss";
import Tasks from "./Task";

const ProjectDetail = (props) => {
  const { project, setIsDeleted, setIsUpdated, projectTasks, taskStatusList, updateTask, createTask } =
    props;
  const [showAlert, setShowAlert] = useState(false);
  const [activeEditContent, setActiveEditContent] = useState("TASKS");

  const [newTitle, setNewTitle] = useState(project.title);
  const [newDescription, setNewDescription] = useState(project.description);
  // const [options, setOptions] = useState([]);
  // const users = useSelector((state) => state.users);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: 0,
    dueDate: "",

  });

  const priorityText = {
    0: "Low",
    1: "Medium",
    2: "High",
  };

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

  // cancel function
  const handleCancel = () => {
    console.log("Cancel clicked");
    handleHeaderBtnClick("TASKS");
  };

  // add new task
  const handleTaskAdd = async () => {
    console.log("Add task clicked", task);
    const addTaskResp = await createTask(task);
    if (addTaskResp.status === 200) {
      console.log("Task added successfully");
      handleCancel();
    }
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

  const tasksContent = (
    <div className="tasks-content">
      <Tasks taskStatusList={taskStatusList} tasks={projectTasks} updateTask={updateTask} />
    </div>
  );

  const addTask = (
    <Paper elevation={3} style={{ marginTop: 5, padding: 10}}>
      <Paper variant="outlined">
        <h4 style={{ textAlign: "center" }}>Add task</h4>
      </Paper>
      <Grid container spacing={3} style={{ padding: 10 }}>
            <Grid item xs={12} sm={6}>
              <p> Title </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="task-title"
                size="small"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p> Description </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={task.description}
                onChange={(event) => {
                  setTask({ ...task, description: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Status </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="task-field">
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={task.status}
                  onChange={(event) => {
                    setTask({ ...task, status: event.target.value });
                  }}
                >
                  <MenuItem value={taskStatusList.TODO}>
                    <span className={`status-text-todo`}>
                      {taskStatusList.TODO}
                    </span>
                  </MenuItem>
                  <MenuItem value={taskStatusList.IN_PROGRESS}>
                    <span className={`status-text-inprogress`}>
                      {taskStatusList.IN_PROGRESS}
                    </span>
                  </MenuItem>
                  <MenuItem value={taskStatusList.COMPLETED}>
                    <span className={`status-text-completed`}>
                      {taskStatusList.COMPLETED}
                    </span>
                  </MenuItem>
                  <MenuItem value={taskStatusList.ON_HOLD}>
                    <span className={`status-text-onhold`}>
                      {taskStatusList.ON_HOLD}
                    </span>
                  </MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Priority </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <Select
                  labelId="demo-simple-select-helper-label"
                  value={task.priority}
                  onChange={(event) => {
                    setTask({ ...task, priority: event.target.value });
                  }}
                >
                  <MenuItem value={0}>
                    <span className={`priority-Low`}>{priorityText[0]}</span>
                  </MenuItem>
                  <MenuItem value={1}>
                    <span className={`priority-Medium`}>{priorityText[1]}</span>
                  </MenuItem>
                  <MenuItem value={2}>
                    <span className={`priority-High`}>{priorityText[2]}</span>
                  </MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              Due Date
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Due Date"
                type="date"
                defaultValue={task.dueDate}
                onChange={(event) => { setTask({ ...task, dueDate: event.target.value }) }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <div className="button-container">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleTaskAdd}
                >
                  Save
                </Button>
                <Button size="small" variant="contained" color="secondary" onClick={handleCancel}> Cancel </Button>
              </div>
            </Grid>
          </Grid>
    </Paper>
  )

  const mainContent = (
    <>
      <Paper className="project-header" variant="outlined">
        <h2>{project?.title}</h2>
        <div className="button-section">
          <IconButton
            aria-label="add-task"
            color = "primary"
            onClick = {()=> {handleHeaderBtnClick('ADD_TASK')}}
          >
            <AddIcon />
          </IconButton>
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
      {activeEditContent === "TASKS" && tasksContent}
      {activeEditContent === "ADD_TASK" && addTask}
    </>
  );

  return <div>{showAlert ? deleteAlert : mainContent}</div>;
};

export default ProjectDetail;
