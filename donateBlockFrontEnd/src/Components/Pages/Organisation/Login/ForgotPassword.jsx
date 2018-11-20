import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import BackendServices from "../../../../Services/BackendServices";
import Simplert from 'react-simplert';
import { withRouter } from 'react-router'


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class ForgotPassword extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      alertType: '', 
      alertTitle: '',
      showAlert: false,
      otp: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }

  creatAlert(Alert, Type, Title) {
    this.setState(state => ({
      showAlert: Alert, 
      alertType: Type, 
      alertTitle: Title ,
    }))
  };

  handleChange(event) {
    var obj = {};
    obj[event.target.id] = event.target.value;
    this.setState(obj);
  };

  handleSubmit(event) {
    BackendServices.ForgotPassword(this.state.email)
    .then(res => {
      this.creatAlert(true, "success", "A link to change to your password has been sent to your registered Email ID.");
  }, error => {

      console.log(error)
      if (error.responseJSON.error.error) 
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
      else {
          this.creatAlert(true, "error", "Somethig went wrong.");
      }
  });
    event.preventDefault();
  };

  closeSimplert() {
    this.setState({showAlert: false});
    this .state.alertType === "success" && this.props.history.push('/');
};

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
          <Avatar className={classes.avatar}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Forgot Password
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{marginTop: 40}}>
            We will send you a link to reset your password, on your Email ID.
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Enter your registered Email Address</InputLabel>
              <Input id="email" value={this.state.email} onChange={this.handleChange} name="email" autoComplete="email" autoFocus />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ForgotPassword));