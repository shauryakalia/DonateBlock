import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    opacity: 0.9,
  },
  bigAvatar: {
    width: 80,
    height: 80,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
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
    opacity: 1,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    opacity: 0.1,
  
  },
  footer: {
    backgroundImage:`url(${Image})`,
    padding: theme.spacing.unit * 6,
  },
});


function HomePage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Donate Block is secure and integral platform for donations that are stored in Etherium Blockchain through Smart Contracts and also it provides different wallets with public and private key for transactions to different users.
            </Typography>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40} justify='center'>
           
              <Grid item  sm={6} md={4} lg={3} justify='center'>
                <NavLink to="/userLogin">
                  <Button onClick={()=>{sessionStorage.setItem('role', 'User')}}>
                  <img src='./man.png' alt='User'/>
                  </Button>
                  </NavLink>
                  <Typography gutterBottom variant="h4" component="h2" align='center'>
                  <font color="#ffffff">Users</font>
                  </Typography>
              </Grid>
              <Grid item  sm={6} md={4} lg={3} justify='center'>
                <NavLink to="/organisationLogin">
                 <Button onClick={()=>{sessionStorage.setItem('role', 'Organisation')}}> 
                  <img src='./teamwork.png' alt='User'/>
                 </Button>
                 </NavLink>
                 <Typography gutterBottom variant="h4"  component="h2" align='center'>
                  <font color="#ffffff">Organisations</font>
                  </Typography>
              </Grid>
              <Grid item  sm={6} md={4} lg={3} justify='center'>
                <NavLink to="/vendorlogin">
                 <Button onClick={()=>{sessionStorage.setItem('role', 'Vendor')}}>
                  <img src='./sale.png' alt='User'/>
                 </Button>
                 </NavLink>
                 <Typography gutterBottom variant="h4"  component="h2" align='center'>
                  <font color="#ffffff">Vendors</font>
                  </Typography>
              </Grid>
          </Grid>
        </div>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);