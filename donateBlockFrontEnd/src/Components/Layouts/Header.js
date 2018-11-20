import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function TabContainer(props) {
  return (
    <Toolbar component="div" style={{ background: 'transparent' ,padding: 1 * 0.33, flex: 1 }}>
      {props.children}
    </Toolbar>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const styles = theme => ({
  toolbarMain: {
    backgroundColor: theme.palette.secondary.light,
    left: 0,
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between'
  },
  bigAvatar: {
    width: 100,
    height: 100,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  LoggedInHeader(role) {
    switch (role){
      case 'User' :
      return (
        <div>
          <a href="https://anders.com/blockchain/hash.html">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}} style={{marginLeft: 10}}>
            BlockChain Demo
          </Button>
          </a>
          <a href="https://rinkeby.etherscan.io/">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}} style={{marginLeft: 10}}>
            BlockChain Explorer
          </Button>
          </a>
          <NavLink to="/userwallet">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'User Wallet')}} style={{marginLeft: 10}}>
            Wallet
          </Button>
          </NavLink>
          <NavLink to="/userprofile">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'User Profile')}} style={{marginLeft: 10}}>
            Profile
          </Button>
          </NavLink>
          <NavLink to="/userdashboard">
          <Button variant="contained" color="primary" style={{marginLeft: 10}}>
            Dashboard
          </Button>
          </NavLink>
          <NavLink to="/">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.clear('isLoggedIn')}} style={{marginLeft: 10}}>
            Sign Out
          </Button>
          </NavLink>
      </div>
      );
      case 'Organisation' :
      return (
        <div>
          <a href="https://anders.com/blockchain/hash.html">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}} style={{marginLeft: 10}}>
            BlockChain Demo
          </Button>
          </a>
          <a href="https://rinkeby.etherscan.io/">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}} style={{marginLeft: 10}}>
            BlockChain Explorer
          </Button>
          </a>
          <NavLink to="/createcampaign">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'Create Campaign')}} style={{marginLeft: 10}}>
            Create Campaign
          </Button>
          </NavLink>
          <NavLink to="/organisationwallet">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'Organisation Wallet')}} style={{marginLeft: 10}}>
            Wallet
          </Button>
          </NavLink>
          <NavLink to="/organisationprofile">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'Organisation Profile')}} style={{marginLeft: 10}}>
            Profile
          </Button>
          </NavLink>
          <NavLink to="/organisationdashboard">
          <Button variant="contained" color="primary" style={{marginLeft: 10}}>
            Dashboard
          </Button>
          </NavLink>
          <NavLink to="/">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.clear('isLoggedIn')}} style={{marginLeft: 10}}>
            Sign Out
          </Button>
          </NavLink>
      </div>
      );
      case 'Vendor' :
      return (
        <div>
          <a href="https://anders.com/blockchain/hash.html">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}} style={{marginLeft: 10}}>
            BlockChain Demo
          </Button>
          </a>
          <a href="https://rinkeby.etherscan.io/">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}} style={{marginLeft: 10}}>
            BlockChain Explorer
          </Button>
          </a>
          <NavLink to="/inventory">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'Inventory')}} style={{marginLeft: 10}}>
            Inventory
          </Button>
          </NavLink>
          <NavLink to="/vendorwallet">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'Vendor Wallet')}} style={{marginLeft: 10}}>
            Wallet
          </Button>
          </NavLink>
          <NavLink to="/vendorprofile">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.setItem('activePage' , 'Vendor Profile')}} style={{marginLeft: 10}}>
            Profile
          </Button>
          </NavLink>
          <NavLink to="/vendordashboard">
          <Button variant="contained" color="primary" style={{marginLeft: 10}}>
            Dashboard
          </Button>
          </NavLink>
          <NavLink to="/">
          <Button variant="contained" color="primary"  onClick={() => {sessionStorage.clear('isLoggedIn')}} style={{marginLeft: 10}}>
            Sign Out
          </Button>
          </NavLink>
      </div>
      );
      default : return null
    }
  }

  render() {
    const { classes } = this.props;
      return (
        <React.Fragment>
          <AppBar position="static" style={{opacity: 0.9}}>
      <Toolbar variant ="dense" className={classes.toolbarMain} color="secondary">
         <img
          alt="Newgen Software Technologies Pvt. Ltd."
          src="./logo1.png"
          className={classes.bigAvatar}
          />
          <Typography variant="h2" color="textPrimary" align="center">&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<font face='san-serif'> Donate Block</font></Typography>
          {sessionStorage.getItem('isLoggedIn')  ? this.LoggedInHeader(sessionStorage.getItem('role')):(
            <div>
              <NavLink to="/about">
              <Button variant="contained"  color="primary" >
                About
              </Button>
              </NavLink>
              <NavLink to="/contact">
              <Button variant="contained" onClick={() => {sessionStorage.setItem('activePage' , 'Contact Us')}} color="primary" style={{marginLeft: 10}} >
                Contact
              </Button>
              </NavLink>
            </div>
          )}
      </Toolbar>
      </AppBar>
      <AppBar position="static" color='Secondary' style={{opacity: 0.6}}>
         <TabContainer >
           <Typography variant="h6" color="textPrimary">
            <font color='#ffffff'>
            &nbsp; &nbsp;Donate Block/{sessionStorage.getItem('role')}/{sessionStorage.getItem('role') === 'User' && sessionStorage.getItem('firstName')}{sessionStorage.getItem('role') === 'Organisation' && sessionStorage.getItem('orgName')}{sessionStorage.getItem('role') === 'Vendor' && sessionStorage.getItem('vendorName')}
            </font>
           </Typography>
          </TabContainer>
        </AppBar>
      </React.Fragment>
      );
    }
  }
  export default withStyles(styles)(Header);
