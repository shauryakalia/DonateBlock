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
            id="firstName"
            name="firstName"
            label="First name"
            value={this.props.values.firstName}
            fullWidth
            autoComplete="fname"
            onChange={this.props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={this.props.values.lastName}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            value={this.props.values.email}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
            label="Address line 1"
            value={this.props.values.address}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={this.props.values.city}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="province" name="province"value={this.props.values.state} onChange={this.props.handleChange} label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={this.props.values.zip}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={this.props.values.country}
            onChange={this.props.handleChange}
            fullWidth
            autoComplete="country"
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