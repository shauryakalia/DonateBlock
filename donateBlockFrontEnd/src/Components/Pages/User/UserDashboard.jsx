import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
      listItem: {
        padding: `${theme.spacing.unit}px 0`,
      },
      heroContent: {
        maxWidth: 1200,
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
        opacity: 0.85
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
        campaigns: [],
        showAlert: false,
        alertType: '',
        alertTitle:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.closeSimplert = this.closeSimplert.bind(this);
    }
componentWillMount = () => {
  BackendServices.getAllCampaign(sessionStorage.getItem('token'))
    .then(res => {
      console.log(res.message)
      this.setState({
        campaigns: res.message.campaign,
      })
  }, error => {
    this.setState({
      campaigns: [
        {
          name: "",
          org: "",
          amtRaised: "",
          targetAmt: ""
        },
        {
          name: "",
          org: "",
          amtRaised: "",
          targetAmt: ""
        },
        {
          name: "",
          org: "",
          amtRaised: "",
          targetAmt: ""
        },
      ],
      donation: '',
    })
   
      }
  );
}

handleDonate = (id, amount, token) => {
  BackendServices.donateToCampaign(id, amount, token)
  .then(res => {
    this.creatAlert(true, "success", "Donation Successful");
}, error => {

    console.log(error)
    if (error.responseJSON.error.error) 
        this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
    else {
        this.creatAlert(true, "error", "Somethig went wrong.");
    }
});
}



handleChange(event) {
  var obj = {};
  obj[event.target.id] = event.target.value;
  this.setState(obj);
};

creatAlert(Alert, Type, Title) {
  this.setState(state => ({
    showAlert: Alert, 
    alertType: Type, 
    alertTitle: Title 
  }))
}

closeSimplert() {
  this.setState({showAlert: false});
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
        {console.log(this.state.campaigns)}
        <div className={classes.heroContent}>
        <Grid container spacing={16} justify="center" style={{flexDirection: 'column'}}>
          <Typography component="h1" variant="h3" align="center" style={{marginTop: 20}} color="textPrimary" paragraph>
            Campaigns
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={16} justify="center" sm={12}>
              { this.state.campaigns.map((campaign) =>
              <Grid item sm={6}>
              <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                  <List disablePadding>  
                  <ListItem className={styles.listItem}>
                      <Typography variant="h4"><b>{campaign.campaignName }</b></Typography>
                    </ListItem>
                  <ListItem className={styles.listItem}>
                      <ListItemText primary="Cause" secondary="Main reason behind it.." />
                      <Typography variant="h6"><b><i>{campaign.campaignCause}</i></b></Typography>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                      <ListItemText primary="Description" secondary="details" />
                      <Typography variant="body2">{campaign.campaignDiscription}</Typography>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                      <ListItemText primary="Amount Raised" secondary="till date" />
                      <Typography variant="body2">{campaign.amount_raised}</Typography>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                      <ListItemText primary="Target Amount" secondary="till date" />
                      <Typography variant="body2">{campaign.amount_required}</Typography>
                    </ListItem>
                  </List>
                  </CardContent>
                  <CardActions>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="phone">Donation Amount</InputLabel>
                    <Input id="donation" type="number" value={this.state.donation} onChange={this.handleChange} name="donation" autoComplete="donation" autoFocus />
                  </FormControl>
                    <Button variant="contained" align="center" size="small" color="primary" onClick={() => {this.handleDonate(campaign._id, this.state.donation, sessionStorage.getItem('token'))}}>
                      Donate
                    </Button>
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