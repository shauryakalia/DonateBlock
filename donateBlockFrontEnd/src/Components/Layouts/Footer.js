import React, { Component } from 'react';
import { Typography,Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
footer: {
    marginTop: 15,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing.unit * 1,
    position: 'relative',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
class Footer extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        const { classes } = this.props;
      return (
        
        <footer className={classes.footer}>
        <Grid container spacing={40} justify='center' sm={12}>
        <Grid item sm={4}>
        <Typography variant="h6" align="center" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
        <font color="#ffffff">Donate Block Team</font>
        </Typography>
        <Typography variant="subtitle2" align="center" component="p">
        <font color="#ffffff"><i>qwrqeter wetwt wet</i></font>
        </Typography>
        <Typography variant="caption" align="center" component="p">
        <font color="#ffffff">qwribn sdgljhb sghgiw rgiuhg</font>
        </Typography>
        <Typography variant="caption" align="center" component="p">
        <font color="#ffffff">Tel : 26964783, 26763571</font>
        </Typography>
        </Grid>
        <Grid item sm={4}>
        <Typography variant="h6" align="center" color="primary" gutterBottom>
          Donate Block
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
        <font color="#ffffff">A BlockChain powered platform for transparent management of donations.</font>
        </Typography>
        </Grid>
        <Grid item sm={4}>
        <Typography variant="h6" align="center" color="primary" gutterBottom>
         Our Social Media Pages
        </Typography>
        <p style={{textAlign:'center'}}>
        <a href="http://facebook.com" target="_blank"><img alt="FaceBook" src="./facebook.png" /> </a>&nbsp; &nbsp; &nbsp;
        <a href="http://plus.google.com" target="_blank"><img alt="Google+" src="./google-plus.png" /> </a>&nbsp; &nbsp;&nbsp;
        <a href="http://twitter.com" target="_blank"><img alt="Twitter" src="./twitter.png" /> </a>&nbsp; &nbsp;&nbsp;
        <a href="https://github.com/" target="_blank"><img alt="Github" src="./github-circle.png" /> </a>
        </p>
        </Grid>
        </Grid>
      </footer>

      );
    }
  }
  Footer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(Footer);

  