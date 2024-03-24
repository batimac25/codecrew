import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listCards, updateCard } from './api-card'; 
import { Card, CardContent, Typography, TextField, Button, makeStyles,Icon } from '@material-ui/core';
import auth from '../lib/auth-helper'; 

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: theme.spacing(2),
  },
}));

export default function EditCard() {
  const [values, setValues] = useState({
    id: '',
    title: '',
    description: '',
    error: '',
    redirectToReferrer: false,
  });
  const classes = useStyles();
  const { cardId } = useParams();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCards(jwt.user._id, {t: jwt.token },signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, id: data._id, title: data.title, description: data.description });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [cardId]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const card = {
      title: values.title || undefined,
      description: values.description || undefined,
    };
    updateCard(cardId,{ t: jwt.token }, card, jwt.user._id).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectToReferrer: true });
      }
    });
  };

  if (values.redirectToReferrer) {
    return navigate(-1); 
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Card
        </Typography>
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        /><br />
        <TextField
          id="description"
          label="Description"
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        /><br />
        {
          values.error && (<Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
    </Card>
  );
}
