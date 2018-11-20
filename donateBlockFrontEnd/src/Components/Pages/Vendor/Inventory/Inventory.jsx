import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import InventoryTableHead from './InventoryTableHead';
import InventoryTableToolbar from './InventoryTableToolbar';
import BackendServices from "../../../../Services/BackendServices";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Simplert from 'react-simplert';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}




const styles = theme => ({
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
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertType: '',
      alertTitle:'',
      selected: 0,
      foodQuantity: 0,
      foodPrice: 0,
      clothesQuantity: 0,
      inventory: [],
      clothesPrice: 0,
      booksQuantity: 0,
      booksPrice: 0,
      page: 0,
      rowsPerPage: 5,
    };
    this.updateItem = this.updateItem.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }
  

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  updateItem = (quantity, price) => {
    this.state.selected === 3 && this.setState({ foodQuantity: quantity, foodPrice: price, });
    this.state.selected === 1 && this.setState({ clothesQuantity: quantity, clothesPrice: price, });
    this.state.selected === 2 && this.setState({ booksQuantity: quantity, booksPrice: price });
  };
  
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

componentWillMount() {
  BackendServices.getInventory(sessionStorage.getItem('token'))
  .then(res => {
    console.log(res)
    this.setState(state => ({
      clothesQuantity: res.message.inventory[0].quantity,
      clothesPrice: res.message.inventory[0].price,
      booksQuantity: res.message.inventory[1].quantity,
      booksPrice: res.message.inventory[1].price,
      foodQuantity: res.message.inventory[2].quantity,
      foodPrice: res.message.inventory[2].price,
    }))
}, error => {
    console.log(error)
    if (error.responseJSON.error.error) 
        this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
    else {
        this.creatAlert(true, "error", "Incorrect Email/Password.");
    }
});
}

  updateInventory(data, token) {
    BackendServices.updateInventory(this.state.clothesQuantity, this.state.clothesPrice, this.state.booksQuantity, this.state.booksPrice, this.state.foodQuantity, this.state.foodPrice, sessionStorage.getItem('token') )
    .then(res => {
      this.creatAlert(true, "success", "Inventory updated, please refresh Browser Page to see updates.");
  }, error => {
  
      console.log(error)
      if (error.responseJSON.error.error) 
          this.creatAlert(true, "error", JSON.stringify(error.responseJSON.error.error));
      else {
          this.creatAlert(true, "error", "Somethig went wrong.");
      }
  });
  };

  handleClick = (event, id) => {
    event.target.checked ? this.setState({ selected: id }) : this.setState({ selected: 0 });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected === id ? true : false;

  render() {
    const data = [
      { item: 'clothes', quantity: this.state.clothesQuantity, price: this.state.clothesPrice, id: 1 },
      { item: 'books', quantity: this.state.booksQuantity, price: this.state.booksPrice, id: 2 },
      { item: 'food', quantity: this.state.foodQuantity, price: this.state.foodPrice, id: 3 }      
    ];
    const { classes } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <main className={classes.layout}>
      <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          disableOverlayClick={true}
          onClose={this.closeSimplert}/>
          <Paper className={classes.paper}>
        <InventoryTableToolbar updateItem= {this.updateItem} numSelected={this.state.selected} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <InventoryTableHead
              numSelected={this.state.selected}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            {console.log(data)}
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onChange={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                         <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <font size="5" ><b>{n.item}</b></font>
                      </TableCell>
                      <TableCell numeric><font size="4" >{n.quantity}</font></TableCell>
                      <TableCell numeric><font size="4" >{n.price}</font></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Grid container spacing={21}>
            <Grid item xs={8} sm={4}></Grid>
            <Grid item xs={8} sm={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                align="center"
                fullWidth
                onClick={ this.updateInventory }
                className={classes.submit}
                style={{ marginTop: 25, marginBottom: 25 }}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={8} sm={4}></Grid>
          </Grid>
        </div>
      </Paper>
      </main>
    );
  }
}

Inventory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inventory);