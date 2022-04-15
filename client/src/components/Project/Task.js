import React, { useState, useEffect } from "react";
import { Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const Tasks = (props) => {
    const { taskStatusList, tasks } = props;

    const [selectedStatusTasks, setSelectedStatusTasks] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState();

    const priorityText = {
        0: "Low",
        1: "Medium",
        2: "High",
    }

    const handleStatusChange = (status) => {
        const selectedStatusTasks = tasks.filter((task) => task.status.toUpperCase() === status.toUpperCase());
        setSelectedStatus(status);
        setSelectedStatusTasks(selectedStatusTasks);
    }

    const taskStatusJSX = taskStatusList && (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Paper variant="outlined" onClick={()=>{handleStatusChange(taskStatusList.TODO)}} className={`status-card todo ${(taskStatusList.TODO === selectedStatus) && 'active'}`}>
                    {taskStatusList.TODO}
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper variant="outlined" onClick={()=>{handleStatusChange(taskStatusList.IN_PROGRESS)}} className={`status-card inprogress ${(taskStatusList.IN_PROGRESS === selectedStatus) && 'active'}`}>
                    {taskStatusList.IN_PROGRESS}
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper variant="outlined" onClick={()=>{handleStatusChange(taskStatusList.COMPLETED)}} className={`status-card completed ${(taskStatusList.COMPLETED === selectedStatus) && 'active'}`}>
                    {taskStatusList.COMPLETED}
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper variant="outlined" onClick={()=>{handleStatusChange(taskStatusList.ON_HOLD)}} className={`status-card onhold ${(taskStatusList.ON_HOLD === selectedStatus) && 'active'}`}>
                    {taskStatusList.ON_HOLD}
                </Paper>
            </Grid>
        </Grid>
        )

    const taskListJSX = (
        <div className="tasks-content">
        <TableContainer component={Paper}>
            <Table aria-label="task table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Assignee</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedStatusTasks && selectedStatusTasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.status} (editable)</TableCell>
                            <TableCell>{task.ownerName ? task.ownerName : '-'}</TableCell>
                            <TableCell>{priorityText[task.priority]}</TableCell>
                            <TableCell>view, edit, delete</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )


    return (
        <>
        {taskStatusJSX}
        <div className="task-list">
            {taskListJSX}
        </div>
        </>
    );
};

export default Tasks;
