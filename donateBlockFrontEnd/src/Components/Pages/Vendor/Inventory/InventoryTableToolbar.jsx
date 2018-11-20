import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditAttributes from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {
  state = {
    itemQuantity: '',
    itemPrice: '',
  };

  handleChange = (event) => {
    var obj = {};
    obj[event.target.id] = event.target.value;
    this.setState(obj);
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };


  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} style={{ paddingLeft: 15, paddingRight: 15 }}>
        <DialogTitle id="simple-dialog-title"><font size="5">Update Item: &nbsp; <i></i></font></DialogTitle>
        <div width="70%">
          <FormControl margin="normal" required fullWidth style={{ paddingLeft: 25, paddingRight: 25 }}>
            <InputLabel htmlFor="itemQuantity">Quantity</InputLabel>
            <Input
              name="itemQuantity"
              type="number"
              value={this.state.itemQuantity}
              onChange={(e) => { this.handleChange(e) }}
              id="itemQuantity"
              autoComplete="itemQuantity"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth style={{ paddingLeft: 25, paddingRight: 25 }}>
            <InputLabel htmlFor="itemPrice">Price</InputLabel>
            <Input
              name="itemPrice"
              type="number"
              value={this.state.itemPrice}
              onChange={(e) => { this.handleChange(e) }}
              id="itemPrice"
              autoComplete="itemPrice"
            />
          </FormControl>
          <Grid container spacing={21}>
            <Grid item xs={8} sm={4}></Grid>
            <Grid item xs={8} sm={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                align="center"
                fullWidth
                onClick={() => { 
                  this.props.updateItem(this.state.itemQuantity, this.state.itemPrice);
                  this.handleClose();
                }}
                className={classes.submit}
                style={{ marginTop: 25, marginBottom: 25 }}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={8} sm={4}></Grid>
          </Grid>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    overflowY: 'auto',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class InventoryTableToolbar extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    open: false,
    selectedValue: 1,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { numSelected, classes } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          <SimpleDialogWrapped
            numSelected={this.props.numSelected}
            updateItem={this.props.updateItem}
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
          {numSelected !== 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected == 3 && 'Update Food Items'}
              {numSelected == 1 && 'Update Clothes '}
              {numSelected == 2 && 'Update Books '}
            </Typography>
          ) : (
              <Typography variant="h6" id="tableTitle">
                <font size="6"><b><i>Inventory</i></b></font>
              </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected !== 0 ? (
            <Tooltip title="Edit Fields">
              <IconButton onClick={this.handleClickOpen} aria-label="View Full Description">
                <EditAttributes />
              </IconButton>
            </Tooltip>
          ) : (
              <Tooltip title="Filter list">
                <IconButton aria-label="Filter list">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
        </div>
      </Toolbar>
    );
  }
}

InventoryTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(InventoryTableToolbar);