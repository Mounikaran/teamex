import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton
} from "@material-ui/core";
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

const Tasks = (props) => {
  const { taskStatusList, tasks, updateTask } = props;

  const [selectedStatusTasks, setSelectedStatusTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();

  const priorityText = {
    0: "Low",
    1: "Medium",
    2: "High",
  };

  useEffect(() => {
    if (taskStatusList) {
      setSelectedStatus(taskStatusList.TODO);
      handleStatusChange(taskStatusList.TODO);
      console.log("running useEffect in tasks");
    }
  }, []);

  const handleStatusChange = (status) => {
    const selectedStatusTasks = tasks.filter(
      (task) => task.status.toUpperCase() === status.toUpperCase()
    );
    setSelectedStatus(status);
    setSelectedStatusTasks(selectedStatusTasks);
  };

  const handleTaskStatusChange = async (taskId, status) => {
    let newTask = { status: status };
    const updateResp = await updateTask(taskId, newTask);
    if(updateResp.status === 200) {
      console.log("Task updated successfully");
      setSelectedStatusTasks(selectedStatusTasks.filter((task) => task._id !== taskId));
    }
  };

  const handleTaskDetailClick = async (taskId) => {
    console.log("Task detail clicked", taskId);
  };

  const taskStatusJSX = taskStatusList && (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper
          variant="outlined"
          onClick={() => {
            handleStatusChange(taskStatusList.TODO);
          }}
          className={`status-card todo ${
            taskStatusList.TODO === selectedStatus && "active"
          }`}
        >
          {taskStatusList.TODO}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          variant="outlined"
          onClick={() => {
            handleStatusChange(taskStatusList.IN_PROGRESS);
          }}
          className={`status-card inprogress ${
            taskStatusList.IN_PROGRESS === selectedStatus && "active"
          }`}
        >
          {taskStatusList.IN_PROGRESS}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          variant="outlined"
          onClick={() => {
            handleStatusChange(taskStatusList.COMPLETED);
          }}
          className={`status-card completed ${
            taskStatusList.COMPLETED === selectedStatus && "active"
          }`}
        >
          {taskStatusList.COMPLETED}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          variant="outlined"
          onClick={() => {
            handleStatusChange(taskStatusList.ON_HOLD);
          }}
          className={`status-card onhold ${
            taskStatusList.ON_HOLD === selectedStatus && "active"
          }`}
        >
          {taskStatusList.ON_HOLD}
        </Paper>
      </Grid>
    </Grid>
  );

  const taskListJSX = (
    <div className="tasks-content">
      <TableContainer component={Paper}>
        <Table aria-label="task table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedStatusTasks &&
              selectedStatusTasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={task.status}
                      onChange={(event) => {
                        handleTaskStatusChange(task._id, event.target.value);
                      }}
                    >
                      <MenuItem value={taskStatusList.TODO}>
                        <span className={`status-text-todo`}>{taskStatusList.TODO}</span>
                      </MenuItem>
                      <MenuItem value={taskStatusList.IN_PROGRESS}>
                      <span className={`status-text-inprogress`}>{taskStatusList.IN_PROGRESS}</span>
                      </MenuItem>
                      <MenuItem value={taskStatusList.COMPLETED}>
                      <span className={`status-text-completed`}>{taskStatusList.COMPLETED}</span>
                      </MenuItem>
                      <MenuItem value={taskStatusList.ON_HOLD}>
                      <span className={`status-text-onhold`}>{taskStatusList.ON_HOLD}</span>
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{task.ownerName ? task.ownerName : "-"}</TableCell>
                  <TableCell><span className={`priority-${priorityText[task.priority]}`}>{priorityText[task.priority]}</span></TableCell>
                  <TableCell>
                    <IconButton onClick={ () => {handleTaskDetailClick(task._id)} }>
                      <KeyboardArrowRightRoundedIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <>
      {taskStatusJSX}
      <div className="task-list">{taskListJSX}</div>
    </>
  );
};

export default Tasks;
