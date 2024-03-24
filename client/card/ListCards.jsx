import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { listCards } from './api-card'; 
import auth from '../lib/auth-helper'; 
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    overflow: 'hidden',
  },
  card: {
    margin: `${theme.spacing(1)}px 0`,
  },
}));

export default function ListCards() {
  const [cards, setCards] = useState([]);
  const jwt = auth.isAuthenticated();
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCards(jwt.user._id, {t: jwt.token },signal).then((data) => {
      if (data && !data.error) {
        setCards(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">Posts</Typography>
        <List>
          {cards.map((card, i) => (
            <ListItem key={i} className={classes.card}>
              <ListItemText primary={card.title} secondary={card.description} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" component={RouterLink} to={`/card/edit/${card._id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" component={RouterLink} to={`/card/delete/${card._id}`}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
