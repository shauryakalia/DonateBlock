import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BackendServices from '../../../Services/BackendServices';


const styles = theme => ({
  layout: {
    width: 'auto',
    bg: '#BBDEFB',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '',
      pvtKey: '',
      pubKey: '',
      
    };
  }

componentWillMount() {
  BackendServices.getOrganisationWallet(sessionStorage.getItem('token'))
  .then(res => {
    console.log(res.message.wallet._id)
    this.setState({
        walletAddress: res.message.wallet.orgWalletAddress,
        pvtKey: res.message.wallet.orgPrivateKey,
        pubKey: res.message.wallet.orgPublicKey,
    })
}, error => {
    console.log(error)
    }
);
}


  render() {
    const { classes } = this.props;
    return (
      <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center" style={{marginBottom: 30}}> <u>ORGANISATION WALLET</u></Typography>
        <Typography variant="title" align="left" style={{marginBottom: 20}}> <b>Wallet Details</b></Typography>  
        <Paper style={{backgroundColor:'#545454', marginBottom: 20}}><Typography color='primary' variant='subtitle1'><font color='#ffffff'>&nbsp; &nbsp;&nbsp;Wallet Address :</font>&nbsp; &nbsp;{this.state.walletAddress}</Typography></Paper>
        <p><Typography variant="body1" align="left" style={{marginBottom: 20}}>This is your Wallet Address</Typography></p>
        <Paper style={{backgroundColor:'#545454', marginBottom: 20}}><Typography color='primary' variant='subtitle1'><font color='#ffffff'>&nbsp; &nbsp;Private Key :</font><p>&nbsp; &nbsp;{this.state.pvtKey}</p></Typography></Paper>
        <p><Typography variant="body1" align="left" style={{marginBottom: 20}}>This is your Wallet's Password</Typography></p>
        <Paper style={{backgroundColor:'#545454', marginBottom: 20 , overflowX: 'auto'}}><Typography color='primary' variant='subtitle1'><font color='#ffffff'>&nbsp; &nbsp;Public Key :</font><p>&nbsp; &nbsp;{this.state.pubKey}&nbsp; &nbsp;</p></Typography></Paper>
        <p><Typography variant="body1" align="left" style={{marginBottom: 20}}>This is the available amount in your wallet.</Typography></p>
      </Paper>
      </main>
    );
  }
}

Wallet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wallet);