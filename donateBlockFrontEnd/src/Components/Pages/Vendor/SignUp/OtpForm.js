import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BackendServices from "../../../../Services/BackendServices";
import Simplert from 'react-simplert';

class OtpForm extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      alertType: '', 
      alertTitle: '',
      showAlert: false,
      otp: ''
    };
    this.handleVerify = this.handleVerify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }
    creatAlert(Alert, Type, Title) {
      this.setState(state => ({
        showAlert: Alert, 
        alertType: Type, 
        alertTitle: Title 
      }))
    };

    handleChange(event) {
      var obj = {};
      obj[event.target.id] = event.target.value;
      this.setState(obj);
    };

    handleVerify(event) {
      BackendServices.verifyOtp(this.state.otp, this.props.email )
      .then(res => {
        this.creatAlert(true, "success", "You are now a registered user of Unitrade.");
    }, error => {
  
        console.log(error)
        if (error.responseJSON.error.error) 
            this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
        else {
            this.creatAlert(true, "error", "Somethig went wrong.");
        }
    });
      event.preventDefault();
    };

    closeSimplert() {
      this.setState({showAlert: false});
  };
    render() {
  return (
    <React.Fragment>
      <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          disableOverlayClick={true}
          onClose={this.closeSimplert}/>
      <Typography variant="subtitle1" gutterBottom>
        Confirm Your Email ID by entering OTP sent to you.
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField required id="otp" value={this.state.otp} onChange={this.handleChange} label="Enter One Time Password" fullWidth autoFocus />
        </Grid>
        <Grid item xs={12} md={6}>
        <Button variant="outlined" size="small" color="secondary" onClick={this.handleVerify}>
          Verify
        </Button>
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}
}

export default OtpForm;