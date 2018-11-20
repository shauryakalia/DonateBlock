import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
});

class Review extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Summary
      </Typography>
      <List disablePadding>   
          <ListItem className={styles.listItem}>
            <ListItemText primary="First Name" secondary="Name that you entered" />
            <Typography variant="body2">{this.props.values.firstName}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Last Name" secondary="Surname that you entered" />
            <Typography variant="body2">{this.props.values.lastName}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Email Address" secondary="E-Mail ID that you enterted" />
            <Typography variant="body2">{this.props.values.email}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Contact No." secondary="Phone Number that you enterted" />
            <Typography variant="body2">{this.props.values.contact}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Residential Address" secondary="Local Address that you entered" />
            <Typography variant="body2">{this.props.values.address}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="City" secondary="City where you live" />
            <Typography variant="body2">{this.props.values.city}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="State/Province" secondary="Province where you're from" />
            <Typography variant="body2">{this.props.values.province}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Country" secondary="Country you belong to" />
            <Typography variant="body2">{this.props.values.country}</Typography>
          </ListItem>
      </List>
    </React.Fragment>
  );
}
}


export default Review;