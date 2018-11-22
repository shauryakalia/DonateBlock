import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserDetails from './UserDetails';
import { NavLink } from 'react-router-dom';
import BackendServices from "../../../../Services/BackendServices";

const styles = theme => ({
  appBar: {
    position: 'relative',
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
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
}});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'a',
      lastName: 'b',
      email: 'c',
      contact: 'd',
      address: 'e',
      city: 'f',
      zip: 'g',
      province:'h',
      country: 'i',
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    BackendServices.getUserDetails(sessionStorage.getItem('token'))
    .then(res => {
      console.log(res.message)
      this.setState({
        firstName: res.message.user_details.first_name,
        lastName: res.message.user_details.last_name,
        email: res.message.user_details.email,
        contact: res.message.user_details.phone,
        address: res.message.user_details.address.street,
        city: res.message.user_details.address.city,
        zip: res.message.user_details.address.zip,
        province: res.message.user_details.address.state,
        country: res.message.user_details.address.country,
      })
  }, error => {
      console.log(error)
      if (error.responseJSON.error.error) 
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
      else {
          this.creatAlert(true, "error", "Incorrect Email/Password.");
      }
  });
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              User Profile
            </Typography>
            <UserDetails values={this.state} />
            <Grid container justify="space-between" style={{marginTop: 20}}> 
            <Grid item>
            </Grid>
            <Grid item>
              <NavLink to="/userdashboard">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {sessionStorage.setItem('activePage' , 'Dashboard')}}
                  className={classes.button}
                >
                  Ok
                </Button>
              </NavLink>
            </Grid>
          </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);