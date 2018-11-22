import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


class BasicInfoForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
    <React.Fragment>
      <Typography variant="caption" gutterBottom>
       <i> Fields marked with * are Mandatory.</i>
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="orgName"
            name="orgName"
            label="Organisation Name"
            value={this.props.values.orgName}
            fullWidth
            autoComplete="fname"
            onChange={this.props.handleChange}
          />
          <TextField
            required
            id="orgOwnerName"
            name="orgOwnerName"
            label="Owner Name"
            value={this.props.values.orgOwnerName}
            fullWidth
            autoComplete="fname"
            onChange={this.props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="orgEmail"
            name="orgEmail"
            label="Email Address"
            value={this.props.values.orgEmail}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="Email"
          />
        </Grid>
        <Grid item xs={2} sm={1}>
        <TextField
            required
            id="isd"
            name="isd"
            label="ISD"
            value={this.props.values.isd}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="91"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contact"
            name="contact"
            label="Contact No."
            value={this.props.values.contact}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="Contact"
          />
          
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={this.props.values.address}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="orgRegId"
            name="orgRegId"
            label="Reg. ID"
            value={this.props.values.orgRegId}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            value={this.props.values.password}
            onChange={this.props.handleChange}
            type="Password"
            fullWidth
            autoComplete="password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="confirmpassword"
            name="confirmpassword"
            type="Password"
            label="Confirm Password"
            value={this.props.values.confirmpassword}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="Password"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
}

export default BasicInfoForm;