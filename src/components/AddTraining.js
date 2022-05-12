import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      const newTraining = {
        ...training, date: new Date(training.date),
        customer: props.params.data.links[1].href,
      };
      props.AddTraining(newTraining);
      handleClose();
    }


  

    const inputChanged = (event) =>  {
        setTraining({...training, [event.target.name]: event.target.value});
    }


return (
    <div>
      <Button 
        style={{marginTop: 10}} 
        variant="outlined" 
        color="primary" 
        onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="DATE format ex. (mm-dd-yyyy): 05-25-2022 12:45"
            name="date"
            value={training.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Duration (minutes)"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
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