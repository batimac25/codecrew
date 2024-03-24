import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, makeStyles } from '@material-ui/core';
import { removeCard } from './api-card'; 
import { useParams, useNavigate } from 'react-router-dom';
import auth from '../lib/auth-helper'; 

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    margin: theme.spacing(1),
    color: theme.palette.secondary.light,
  },
}));

export default function DeleteCard() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  const { cardId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteConfirmation = () => {
    removeCard(jwt.user._id, cardId,{ t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
          navigate('/cards'); 
      }
    });
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} className={classes.deleteButton}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteConfirmation} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
