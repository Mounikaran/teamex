import React, { useState } from "react";
import { Button, Card, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { saveProject } from "../../services/ProjectServices";
import Alert from "@material-ui/lab/Alert";
import './project.scss';

const CreateProject = ({ setIsProjectSaved}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleSave = async () => {
    console.log("Save clicked", title, description);
    const project = {
        title: title,
        description: description
    }
    const saveResp = await saveProject(project);
    console.log("Save response", saveResp);
    if (saveResp.status === 201) {
      console.log("Project saved successfully");
      setIsProjectSaved(true);
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const projectForm = (
    <Card className="project-form" variant="outlined">
      <TextField
        id="project-title"
        size="small"
        fullWidth
        label="Project Title"
        variant="outlined"
        className="project-input"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="project-description"
        label="Description"
        variant="outlined"
        className="project-input"
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSave}
        >
          Create Project
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
  );

  const projectSavedAlert = (
    <div style={{ marginTop: 20 }}>
      <Alert variant="outlined" severity="success">
        Project saved successfully
      </Alert>
    </div>
  );

  return (
    <div>
      <Paper className="create-project-header" variant="outlined">
        <h2>Create New Project</h2>
      </Paper>

      {showAlert ? projectSavedAlert : projectForm}
    </div>
  );
};

export default CreateProject;
