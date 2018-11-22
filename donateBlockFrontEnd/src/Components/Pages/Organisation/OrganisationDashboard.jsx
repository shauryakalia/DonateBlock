import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import BackendServices from "../../../Services/BackendServices";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
      }
  }
componentWillMount = () => {
BackendServices.getSelfCampaign(sessionStorage.getItem('token'))
  .then(res => {
    console.log(res.message)
    this.setState({
      campaigns: res.message.campaign,
    })
}, error => {
  this.setState({
    campaigns: [
      {
        name: "err",
        org: "err",
        amtRaised: "err",
        targetAmt: "err"
      },
      {
        name: "err",
        org: "err",
        amtRaised: "err",
        targetAmt: "err"
      },
      {
        name: "err",
        org: "err",
        amtRaised: "err",
        targetAmt: "err"
      },
    ],
  })
    }
);
}

render() {
// console.log(this.getUserDetails())
  const { classes } = this.props;
  return (
      <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
      <Grid container spacing={16} justify="center" style={{flexDirection: 'column'}}>
        <Typography component="h1" variant="h3" align="center" style={{marginTop: 20}} color="textPrimary" paragraph>
          Campaigns 
        </Typography>
        <Typography align="center" color="textPrimary" paragraph><font size="4">Self Running / Finished</font></Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center" sm={12}>
            { this.state.campaigns.map((campaign) =>
            <Grid item sm={6}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                <List disablePadding>   
                    <ListItem className={styles.listItem}>
                      <ListItemText primary="Name" secondary="Active Campaign" />
                      <Typography variant="h5"><b><i>{campaign.campaignName}</i></b></Typography>
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
                    <ListItem style={styles.listItem}>
                      <ListItemText primary="Delivery Address" secondary="where to deliver goods" />
                      <Typography variant="body2">{campaign.campaignAddress}</Typography>
                    </ListItem>
                </List>
                </CardContent>
                {campaign.amount_raised >= campaign.amount_required && !campaign.deliverable && (
                <CardActions>
                    <Button variant="contained" align="center" color="secondary" onClick={() => {sessionStorage.setItem('activePage' , 'API Docs')}}>
                      Finish Campaign
                    </Button>
                  </CardActions>
                )}
                {campaign.deliverable && (
                <CardActions>
                    <Button variant="contained" color ="primary" align="center" color="secondary" disabled >
                      <font color="#228B22">Finished</font>
                    </Button>
                  </CardActions>
                )}
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