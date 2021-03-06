import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VendorDetails from './VendorDetails';
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
        vendorDetails: {},
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    BackendServices.getVendorDetails(sessionStorage.getItem('token'))
    .then(res => {
      console.log(res.message.vendor_details)
      this.setState({vendorDetails: res.message.vendor_details})
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
              Vendor Profile
            </Typography>
            <VendorDetails values={this.state.vendorDetails} />
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