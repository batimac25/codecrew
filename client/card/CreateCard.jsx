import React, { useState } from 'react';
import { createCard } from './api-card'; 
import auth from '../lib/auth-helper'; 
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, makeStyles } from '@material-ui/core';

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
    color: theme.palette.protectedTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateCard = () => {
    const navigate = useNavigate();
    const jwt = auth.isAuthenticated();
    const [card, setCard] = useState({ title: '', description: '', createdBy: jwt.user._id.toString() });
    const classes = useStyles();

    const handleChange = name => event => {
        setCard({ ...card, [name]: event.target.value });
    };

    const clickSubmit = () => {
        createCard({ t: jwt.token }, card).then(data => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                console.log('Post created successfully:', data);
                navigate('/cards');
            }
        });
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                    New Post
                </Typography>
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={card.title}
                    onChange={handleChange('title')}
                    margin="normal"
                /><br />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    className={classes.textField}
                    value={card.description}
                    onChange={handleChange('description')}
                    margin="normal"
                /><br />
            </CardContent>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Create</Button>
        </Card>
    );
};

export default CreateCard;
