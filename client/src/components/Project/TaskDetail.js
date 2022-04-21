import React, { useEffect, useState } from "react";
import { Paper, Select, MenuItem, IconButton, Grid } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const TaskDetail = (props) => {
  const {
    task,
    taskStatusList,
    toggleTaskDetailAndList,
    priorityText
  } = props;

  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  useEffect(() => {
    console.log("running useEffect in task detail");
  }, []);

  const handleStatusChange = (status) => {
    setStatus(status);
  }

  return (
    <>
      <Paper elevation={2}>
        <div className="task-header">
          <div>
            <h4>{task.title}</h4>
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
                <Grid item xs={12} sm={12}>
                    <p>{task.description}</p>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="task-field">
                    <p> Status </p>
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
                <Grid item xs={12} sm={4}>
                    <div>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        value={priority}
                        onChange={(event) => {
                            setPriority(event.target.value);
                        }}
                        >
                        <MenuItem value={0}>
                            <span className={`priority-Low`}>
                            {priorityText[0]}
                            </span>
                        </MenuItem>
                        <MenuItem value={1}>
                            <span className={`priority-Medium`}>
                            {priorityText[1]}
                            </span>
                        </MenuItem>
                        <MenuItem value={2}>
                            <span className={`priority-High`}>
                            {priorityText[2]}
                            </span>
                        </MenuItem>
                        </Select>
                    </div>
                </Grid>
            </Grid>
        </div>
      </Paper>
    </>
  );
};

export default TaskDetail;
