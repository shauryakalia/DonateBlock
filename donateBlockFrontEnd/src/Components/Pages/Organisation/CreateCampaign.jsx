import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, NativeSelect } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BackendServices from '../../../Services/BackendServices';
import Simplert from 'react-simplert';

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
  }
});

class createCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertType: '',
      alertTitle:'',
      campaignName: '',
      campaignCause: '',
      campaignDiscription: '',
      amount_required: '',
      campaignRequirement: 'food',
      quantity: 0,
      campaignAddress: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }

  handleChange(event) {
    var obj = {};
    obj[event.target.id] = event.target.value;
    this.setState(obj);
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

  handleSubmit(event) {
    BackendServices.createCampaign(sessionStorage.getItem('token'), this.state.campaignName, this.state.campaignCause, this.state.campaignDiscription, this.state.amount_required, this.state.campaignRequirement, this.state.quantity, this.state.campaignAddress)
      .then(res => {
        this.creatAlert(true, "success", "New Campaign created.");
      }, error => {

        console.log(error)
        if (error.responseJSON.error.error)
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
        else {
          this.creatAlert(true, "error", "Somethig went wrong.");
        }
      });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          disableOverlayClick={true}
          onClose={this.closeSimplert}/>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Create Campaign
            </Typography>
            <Typography variant="caption" gutterBottom>
              <i> Fields marked with * are Mandatory.</i>
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="campaignName"
                  name="campaignName"
                  label="Campaign Name"
                  value={this.state.campaignName}
                  fullWidth
                  autoComplete="Campaign"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="campaignCause"
                  name="campaignCause"
                  label="Cause"
                  value={this.state.campaignCause}
                  onChange={this.handleChange}
                  fullWidth
                  autoComplete="Cause"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="campaignDiscription"
                  name="campaignDiscription"
                  label="Campaign Discription"
                  value={this.state.campaignDiscription}
                  onChange={this.handleChange}
                  fullWidth
                  autoComplete="Discription"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="amount_required"
                  name="amount_required"
                  label="Target Amount"
                  value={this.state.amount_required}
                  onChange={this.handleChange}
                  fullWidth
                  autoComplete="Contact"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NativeSelect
                  required
                  id="campaignRequirement"
                  name="campaignRequirement"
                  label="Please Select Requirement"
                  value={this.state.campaignRequirement}
                  onChange={this.handleChange}
                  fullWidth
                >
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="books">Books</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="quantity"
                  name="quantity"
                  type="number"
                  label="Quantity"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="campaignAddress"
                  name="campaignAddress"
                  label="Campaign Address"
                  value={this.state.campaignAddress}
                  onChange={this.handleChange}
                  fullWidth
                  autoComplete="Address"
                />
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: 20 }}>
              <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                    className={classes.button}
                  >
                    Create Campaign
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

createCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(createCampaign);