import React, { useEffect, useState } from "react";
import {
  Paper,
  Select,
  MenuItem,
  IconButton,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";

const TaskDetail = (props) => {
  const {
    task,
    taskStatusList,
    toggleTaskDetailAndList,
    priorityText,
    updateTask,
    options,
    setTaskUpdated
  } = props;

  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignedTo);
  const [selectedDate, setSelectedDate] = useState(task.dueDate);

  const handleSaveClick = async () => {
    const newTask = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      assignedTo: assignee,
      dueDate: selectedDate,
    };
    const respSaveTask = await updateTask(task._id, newTask);
    if (respSaveTask.status === 200) {
      setTitle(title);
      setTitleEdit(false);
      setTaskUpdated(true);
      console.log("Task updated successfully");
    }
  };

  const [titleEdit, setTitleEdit] = useState(false);

  const toggleTitleHead = () => {
    setTitleEdit(!titleEdit);
  };

  useEffect(() => {
    console.log("running useEffect in task detail");
    console.log("Options : ", options);
  }, []);

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  return (
    <>
      <Paper elevation={2}>
        <div className="task-header">
          <div>
            {titleEdit ? (
              <TextField
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            ) : (
              <h4>{title}</h4>
            )}
            <span>
              <IconButton onClick={toggleTitleHead}>
                {titleEdit ? <ClearIcon /> : <EditIcon />}
              </IconButton>
            </span>
          </div>
          <div>
            <IconButton
              onClick={() => {
                toggleTaskDetailAndList("LIST");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>
        </div>
        <div className="task-body">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <p> Description </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={description}
                fullWidth
                onChange={(event) => {
                  setDescription(event.target.value);
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
                  value={status}
                  onChange={(event) => {
                    handleStatusChange(event.target.value);
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
              <p>Assigned To</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                value={assignee}
                onChange={(event) => {
                  setAssignee(event.target.value);
                }}
                classNamePrefix="select"
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Priority </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <Select
                  labelId="demo-simple-select-helper-label"
                  value={priority}
                  onChange={(event) => {
                    setPriority(event.target.value);
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
                defaultValue={selectedDate}
                onChange={(event) => { setSelectedDate(event.target.value); }}
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
                  onClick={handleSaveClick}
                >
                  {" "}
                  Save{" "}
                </Button>
                {/* <Button size="small" variant="contained" color="secondary" > Cancel </Button> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default TaskDetail;
