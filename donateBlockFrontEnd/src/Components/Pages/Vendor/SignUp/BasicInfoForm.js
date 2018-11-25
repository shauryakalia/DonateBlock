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
            id="vendorName"
            name="vendorName"
            label="Vendor Name"
            value={this.props.values.vendorName}
            fullWidth
            autoComplete="fname"
            onChange={this.props.handleChange}
          />
          <TextField
            required
            id="vendorEmail"
            name="vendorEmail"
            label="Vendor Email"
            value={this.props.values.vendorEmail}
            fullWidth
            autoComplete="fname"
            onChange={this.props.handleChange}
          />
        </Grid>
        </Grid>
        <Grid item xs={2} sm={1}>
        <TextField
            required
            id="isd_code"
            name="isd_code"
            label="ISD"
            value={this.props.values.isd_code}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="isd_code"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="vendorPhone"
            name="vendorPhone"
            label="Contact No."
            value={this.props.values.vendorPhone}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="Contact"
          />
          
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="vendorAddress"
            name="vendorAddress"
            label="Address"
            value={this.props.values.vendorAddress}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vendorRegId"
            name="vendorRegId"
            label="Reg. ID"
            value={this.props.values.vendorRegId}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vendorPassword"
            name="vendorPassword"
            label="vendorPassword"
            value={this.props.values.vendorPassword}
            onChange={this.props.handleChange}
            type="Password"
            fullWidth
            autoComplete="vendorPassword"
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
            autoComplete="confirmpassword"
          />
        </Grid>
    </React.Fragment>
  );
}
}

export default BasicInfoForm;