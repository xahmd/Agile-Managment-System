import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import ProjectContext from "../../../context/project/project-context";
import SuccessSnackBar from "../../snakbars/SuccessSnackBar";
import { isValid } from "../../../utils/clientSideValidators/uploadVisionValidator";
import router from "next/router";
import DetailsComponent from "./DetailsComponent";
import OverviewComponent from "./OverviewComponent";
import StepperComponent from "../../stepper/StepperComponent";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
});

class VisionDocumentUploadComponent extends Component {
  static contextType = ProjectContext;

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      loading: false,
      success: false,
      title: "",
      abstract: "",
      scope: "",
      modules: [],
      file: [],
      titleError: { show: false, message: "" },
      abstractError: { show: false, message: "" },
      scopeError: { show: false, message: "" },
      modulesError: { show: false, message: "" },
      fileError: { show: false, message: "" },
      currentModule: "",
    };
  }

  setTitleError = () => {
    this.setState({
      titleError: { show: true, message: "Title must be between 2-100 characters." },
    });
  };

  setAbstractError = () => {
    this.setState({
      abstractError: { show: true, message: "Please select a lecturer." },
    });
  };

  setScopeError = () => {
    this.setState({
      scopeError: { show: true, message: "Scope must be between 50-1000 characters." },
    });
  };

  setModulesError = () => {
    this.setState({
      modulesError: { show: true, message: "Please enter at least 1 module." },
    });
  };

  setFileError = () => {
    this.setState({
      fileError: { show: true, message: "Please attach your document." },
    });
  };

  componentDidMount() {
    this.formData = new FormData();
  }

  handleSuccess = () => {
    this.setState({ success: false });
    router.push("/student/roadmap");
  };

  handleNext = () => {
    const { title, abstract, scope } = this.state;

    // Reset errors
    this.setState({
      titleError: { show: false, message: "" },
      abstractError: { show: false, message: "" },
      scopeError: { show: false, message: "" },
    });

    let valid = true;

    // Validate title
    if (!title || title.length < 2 || title.length > 100) {
      valid = false;
      this.setTitleError();
    }

    // Validate abstract (lecturer selection)
    if (!abstract) {
      valid = false;
      this.setAbstractError();
    }

    // Validate scope
    if (!scope || scope.length < 50 || scope.length > 1000) {
      valid = false;
      this.setScopeError();
    }

    if (valid) {
      this.setState((prevState) => ({
        activeStep: prevState.activeStep + 1,
      }));
    }
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleSubmit = () => {
    if (
      !isValid(
        this.state,
        this.setTitleError,
        this.setAbstractError,
        this.setScopeError,
        this.setModulesError,
        this.setFileError
      )
    ) {
      this.setState({ loading: true });

      let mod = [];
      this.state.modules.map((module, i) => {
        mod[i] = module.label;
      });
      this.formData.set("majorModules", JSON.stringify(mod));

      this.context
        .uploadVision(this.formData, this.context.project.project._id)
        .then((res) => {
          this.setState({ success: true });
        })
        .catch((err) => console.log(err.message));
    }
  };

  handleDelete = (moduleToDelete) => () => {
    this.setState({
      modules: this.state.modules.filter((module) => module.key !== moduleToDelete.key),
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [`${name}Error`]: { show: false, message: "" },
    });
    this.formData.set(name, value);
  };

  handleModuleChange = (e) => {
    this.setState({
      currentModule: e.target.value,
      modulesError: { show: false, message: "" },
    });
  };

  handleSubmitModule = (e) => {
    e.preventDefault();
    if (this.state.currentModule.trim() !== "") {
      this.setState({
        modules: [
          ...this.state.modules,
          {
            key: this.state.modules.length + 1,
            label: this.state.currentModule,
          },
        ],
        currentModule: "",
      });
    }
  };

  handleDropZone = (files) => {
    this.setState({ file: files[0] });
    this.formData.set("file", files[0]);
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        const { title, titleError, abstract, abstractError, scope, scopeError } = this.state;
        return (
          <OverviewComponent
            title={title}
            titleError={titleError}
            abstract={abstract}
            abstractError={abstractError}
            scope={scope}
            scopeError={scopeError}
            handleChange={this.handleChange}
          />
        );
      case 1:
        const { currentModule, modules, modulesError } = this.state;
        return (
          <DetailsComponent
            currentModule={currentModule}
            handleDelete={this.handleDelete}
            handleModuleChange={this.handleModuleChange}
            handleSubmitModule={this.handleSubmitModule}
            modules={modules}
            modulesError={modulesError}
          />
        );
      case 2:
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={10} md={8}>
              <DropzoneArea
                onChange={this.handleDropZone}
                acceptedFiles={["application/pdf"]}
                filesLimit={1}
                maxFileSize={10000000}
                dropzoneText="Drag and drop or upload your proposal in PDF format here"
              />
              {this.state.fileError.show && (
                <Typography variant="caption" color="error">
                  {this.state.fileError.message}
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.loading && <LinearProgress color="secondary" />}
        <SuccessSnackBar open={this.state.success} message="File Uploaded" handleClose={this.handleSuccess} />
        <StepperComponent
          steps={["Overview", "Details", "Upload"]}
          handleBack={this.handleBack}
          handleNext={this.handleNext}
          handleSubmit={this.handleSubmit}
          getStepContent={this.getStepContent}
          activeStep={this.state.activeStep}
        />
      </div>
    );
  }
}

export default withStyles(styles)(VisionDocumentUploadComponent);
