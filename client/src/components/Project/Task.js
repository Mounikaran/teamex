import React, { useState, useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";

const Tasks = (props) => {
    const { taskStatusList, tasks } = props;

    const [selectedStatusTasks, setSelectedStatusTasks] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("toDo");

    const handleStatusChange = (status) => {
        const selectedStatusTasks = tasks.filter((task) => task.status === status.toUpperCase());
        setSelectedStatus(status);
        setSelectedStatusTasks(selectedStatusTasks);
    }

    useEffect(() => {
        handleStatusChange("ToDo");
    }, [])

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
        <Grid container spacing={3}>
            {selectedStatusTasks && selectedStatusTasks.map((task) => (
                <Grid item xs={12}>
                    <Paper variant="outlined" className="task-card">
                        <div>
                        {task.title}
                        </div>
                        <div>
                            delete
                            edit
                        </div>
                    </Paper>
                </Grid>
            ))}
        </Grid>
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
