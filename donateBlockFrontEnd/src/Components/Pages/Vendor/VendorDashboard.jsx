import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { NavLink } from 'react-router-dom';
import BackendServices from "../../../Services/BackendServices";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Simplert from 'react-simplert';

const styles = theme => ({
    paper:{
        padding: 20,
        marginTop: 15,
        marginLeft: 2.5,
        marginRight: 2.5,
        height: 500,
    },
    heroUnit: {
        opacity: 0.9,
      },
      bigAvatar: {
        width: 150,
        height: 150,
      },
      heroContent: {
        maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
      },
      heroButtons: {
        marginTop: theme.spacing.unit * 4,
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.light,
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
});

class Dashboard extends React.Component {
  constructor(props) {
  super(props);
  this.state={
    consignments: [],
      }
      this.closeSimplert = this.closeSimplert.bind(this);
  }
componentWillMount = () => {
BackendServices.getVendorDetails(sessionStorage.getItem('token'))
  .then(res => {
    console.log(res.message)
    this.setState({
      consignments: res.message.vendor_details.consignment,
    })
}, error => {
  this.setState({
    consignments: [],
  })
    }
);
}

creatAlert(Alert, Type, Title) {
  this.setState(state => ({
    showAlert: Alert, 
    alertType: Type, 
    alertTitle: Title 
  }))
};

closeSimplert() {
  this.setState({showAlert: false});
}

handleSend = (id) => {
  BackendServices.itemDelivered( id, sessionStorage.getItem('token') )
  .then(res => {
    console.log(res.message);
    this.setState({
      consignments: res.message.vendor_details.consignment,
    });
    this.creatAlert(true, "success", "Items sent.");
  }, error => {
  
      console.log(error)
      if (error.responseJSON.error.error) 
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
      else {
          this.creatAlert(true, "error", "Somethig went wrong.");
      }
  })
}

render() {
// console.log(this.getUserDetails())
  const { classes } = this.props;
  return (
      <div className={classes.heroUnit}>
      <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          disableOverlayClick={true}
          onClose={this.closeSimplert}/>
      {console.log(this.state.consignments)}
      <div className={classes.heroContent}>
      <Grid container spacing={16} justify="center" style={{flexDirection: 'column'}}>
      <Typography component="h1" variant="h3" align="center" style={{marginTop: 20}} color="textPrimary" paragraph>
          Orders 
        </Typography>
        <Typography align="center" color="textPrimary" paragraph><font size="4">Running / Completed</font></Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center" sm={12}>
            { this.state.consignments.map((consignment) =>
            <Grid item sm={6}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                <List disablePadding>  
                <ListItem className={styles.listItem}>
                    <Typography variant="h4"><b>{consignment.campaign_data.campaignRequirement }</b></Typography>
                  </ListItem>
                <ListItem className={styles.listItem}>
                    <ListItemText primary="Address" secondary="Where to deliver.." />
                    <Typography variant="h6"><b><i>{consignment.campaign_data.address}</i></b></Typography>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <ListItemText primary="Quantity to be delivered"  />
                    <Typography variant="body2">{consignment.campaign_data.quantity}</Typography>
                  </ListItem>
                  <ListItem style={styles.listItem}>
                    <ListItemText primary="Amount" secondary="Earnings through consignment" />
                    <Typography variant="body2">{consignment.campaign_data.amount}</Typography>
                  </ListItem>
                </List>
                </CardContent>
                <CardActions>
                  { !consignment.sent &&<Button variant="contained" align="center" size="small" color="primary" onClick={() => {this.handleSend(consignment.campaign_id)}}>
                    Send
                  </Button>}
                  { consignment.sent &&<Button variant="contained" align="center" size="small" color="secondary" disabled>
                    Sent
                  </Button>}
                </CardActions>
              </Card>
            </Grid>
            )}
          </Grid>
        </div>
        </Grid>
      </div>
    </div>
);
}
}
Dashboard.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);