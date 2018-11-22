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
        Organisation Summary
      </Typography>
      <List disablePadding>   
          <ListItem className={styles.listItem}>
            <ListItemText primary="Organisation Name" />
            <Typography variant="body2">{this.props.values.orgName}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Owner Name" />
            <Typography variant="body2">{this.props.values.orgOwnerName}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Email Address" />
            <Typography variant="body2">{this.props.values.orgEmail}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="ISD Code" />
            <Typography variant="body2">{this.props.values.isd}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Contact No." />
            <Typography variant="body2">{this.props.values.contact}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Official Address" />
            <Typography variant="body2">{this.props.values.address}</Typography>
          </ListItem>
          
          <ListItem style={styles.listItem}>
            <ListItemText primary="Registration ID" />
            <Typography variant="body2">{this.props.values.orgRegId}</Typography>
          </ListItem>
          <ListItem style={styles.listItem}>
            <ListItemText primary="Country" />
            <Typography variant="body2">{this.props.values.country}</Typography>
          </ListItem>
      </List>
    </React.Fragment>
  );
}
}


export default Review;