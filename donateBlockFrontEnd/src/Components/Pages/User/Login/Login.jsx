import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import UserIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import { NavLink } from 'react-router-dom';
import BackendServices from "../../../../Services/BackendServices";
import Simplert from 'react-simplert';
import { withRouter } from 'react-router'



const styles = theme => ({
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertType: '', 
      alertTitle: '',
      showAlert: false ,
      phone: '',
      isd: '',
      password: '',
      isLoggedIn: false
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleSignin = this.handleSignin.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }
  
  creatAlert(Alert, Type, Title) {
    this.setState(state => ({
      showAlert: Alert, 
      alertType: Type, 
      alertTitle: Title 
    }))
  };

  handleSignin(event) {
    event.preventDefault();
    BackendServices.UserLogIn(this.state.phone, this.state.isd, this.state.password)
    .then(res => {
       this.props.handleLogin(res.message);
       this.props.history.push('/userdashboard');
  }, error => {
      console.log(error)
      this.props.history.push('/userlogin');
      if (error.responseJSON.error.error) 
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
      else {
          this.creatAlert(true, "error", "Incorrect Email/Password.");
      }
  });
  };

  closeSimplert() {
    this.setState({showAlert: false});
};

  handleChange(event) {
    var obj = {};
    obj[event.target.id] = event.target.value;
    this.setState(obj);
  };

  render(){
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
            <UserIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone No.</InputLabel>
              <Input id="phone" value={this.state.phone} onChange={this.handleChange} name="phone" autoComplete="phone" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required >
              <InputLabel htmlFor="isd">ISD Code</InputLabel>
              <Input id="isd" value={this.state.isd} onChange={this.handleChange} name="isd" autoComplete="isd" />
            </FormControl>
            <FormControlLabel
              labelPlacement="start" style={{marginTop: 20}} control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event)=>{
                this.handleSignin(event);
              }}
            >
              Sign in
            </Button>
          </form>
          <Grid container style={{marginTop: 20}}>
          <Grid elememt>
            <CardActions>
              <NavLink to="/userforgotpassword">
              <Button size="small" color="primary">
                Forgot Password
              </Button>
              </NavLink>
            </CardActions>
          </Grid>
          <Grid elememt>
            <CardActions>
              <NavLink to="/usersignup">
              <Button size="small" color="primary" >
                Register
              </Button>
              </NavLink>
            </CardActions>
          </Grid>
        </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Login));