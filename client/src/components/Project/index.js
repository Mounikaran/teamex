import { Paper } from "@material-ui/core";
import React from "react";

import './project.scss';

const ProjectDetail = (props) => {
    const { project, tasks } = props;

    return (
        <div>
            <Paper className='project-header' variant="outlined">
                <h2>{project?.title}</h2>
            </Paper>
            
        </div>
    )
}

export default ProjectDetail;