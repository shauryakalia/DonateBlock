import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

class VendorDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Vendor Summary
      </Typography>
      <List disablePadding>   
      <List disablePadding>   
          <ListItem className={styles.listItem}>
            <ListItemText primary="Vendor Name"  />
            <Typography variant="body2">{this.props.values.vendorName}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Email Address"  />
            <Typography variant="body2">{this.props.values.vendorEmail}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="ISD" />
            <Typography variant="body2">{this.props.values.isd_code}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Contact No."  />
            <Typography variant="body2">{this.props.values.vendorPhone}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Residential Address"  />
            <Typography variant="body2">{this.props.values.vendorAddress}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Registration ID"  />
            <Typography variant="body2">{this.props.values.vendorRegId}</Typography>
          </ListItem>
      </List>
      </List>
    </React.Fragment>
  );
}
}
export default VendorDetails;