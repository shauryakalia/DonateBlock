import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';
import BasicInfoForm from './BasicInfoForm';
import Review from './Review';
import { NavLink } from 'react-router-dom';
import BackendServices from "../../../../Services/BackendServices";
import Simplert from 'react-simplert';




const styles = theme => ({
  appBar: {
    position: 'relative',
    opacity: 0.6,
  },
  layout: {
    width: 'auto',
    bg: '#BBDEFB',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  bigAvatar: {
    width: 80,
    height: 80,
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  footer: {
    marginTop: 60,
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing.unit * 6,
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Basic Info.', 'Verify Details'];

function getStepContent(step, values, handleChange) {
  switch (step) {
    case 0:
      return <BasicInfoForm values={values} handleChange={handleChange}/>;
    case 1:
      return <Review values={values} handleChange={handleChange}/>;
    default:
      throw new Error('Unknown step');
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      showAlert: false,
      alertType: '',
      alertTitle:'',
      orgName  :  '',
      orgEmail : '',
      orgPhone :  '',
      isd_code : '',
      orgPassword : '',
      orgRegId : '',
      orgAddress : '',
      orgOwnerName : '',  
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }

  handleChange(event) {
    var obj = {};
    obj[event.target.id] = event.target.value;
    this.setState(obj);
  }

  creatAlert(Alert, Type, Title) {
    this.setState(state => ({
      showAlert: Alert, 
      alertType: Type, 
      alertTitle: Title 
    }))
  };

  handleSubmit(event) {
    BackendServices.orgSignUp( this.state.orgName, this.state.orgEmail, this.state.orgPhone, this.state.isd_code, this.state.orgPassword, this.state.orgRegId, this.state.orgAddress, this.state.orgOwnerName)
    .then(res => {
      this.creatAlert(true, "success", "You are Succesfully Signed Up..");
  }, error => {

      console.log(error)
      if (error.responseJSON.error.error) 
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
      else {
          this.creatAlert(true, "error", "Somethig went wrong.");
      }
  });
    this.handleNext();
    event.preventDefault();
  }


  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  closeSimplert() {
    this.setState({showAlert: false});
}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          disableOverlayClick={true}
          onClose={this.closeSimplert}/>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Sign Up
            </Typography>
            <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.state.activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutstateterBottom>
                    {this.state.alertType === "Success" ? 'Thank you for registering with us.' : 'Error in Signing Up !'}
                  </Typography>
                  <Typography variant="subtitle1">
                    {this.state.alertType === "Success" ? 'You are now a certified user for UniTrade Blockchain Trade-Finance platform powered by Newgen Software Technologies Pvt.Ltd..': 'There were some errors in signing you up last time, please retry.'}
                  </Typography>
                  <Grid container spacing={24}><Grid item xs={4}></Grid>
                  <Grid item xs={4}>
                  {this.state.alertType === "Success" ?(
                  <NavLink to="/userLogin">
                  <Button size="contained" color="primary" style = {{align: 'center', marginTop :10, marginBottom :10}}>
                    Back to Login 
                  </Button>
                  </NavLink>
                  ):(
                    <Grid container justify="space-between">
                    <Grid item>
                    <NavLink to="/userLogin">
                    <Button size="contained" color="primary" style = {{ marginTop :10, marginBottom :10, marginRight: 1}}>
                      Back to Login 
                    </Button>
                    </NavLink>
                    </Grid>
                    <Grid item>
                  <Button size="contained" onClick={this.handleReset} color="primary" style = {{marginTop :10, marginBottom :10}}>
                    Retry 
                  </Button>
                  </Grid>
                  </Grid>
                  )}
                  </Grid><Grid item xs={4}></Grid>
                  </Grid>  
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(this.state.activeStep, this.state, this.handleChange)}
                  <div className={classes.buttons}>
                    {this.state.activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.state.activeStep === steps.length - 1 ? this.handleSubmit : this.handleNext}
                      className={classes.button}
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Submit' : (this.state.activeStep === 0 ? 'Next':'Done')}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);