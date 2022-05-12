import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Addcustomer(props) {
  const [open, setOpen] = React.useState(false);

  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    setCustomer({...customer, [e.target.name]: e.target.value})
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addCustomer(customer);
    setOpen(false);
  }

  return (
    <div>
      <Button style={{margin: 20}} variant="outlined" color="primary" onClick={handleClickOpen}>
        ADD Customer
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new customer</DialogTitle>
        <DialogContent>
        <DialogContentText>
        <b> Fill in the details for the customer. </b>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Street Address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={customer.email}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}