import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import front from '../assets/images/front.jpeg';
import { listCards } from '../card/api-card';
import { useNavigate } from 'react-router-dom';
import auth from '../lib/auth-helper'; 

import image1 from '../assets/images/image1.jpeg';
import image2 from '../assets/images/image2.jpeg';
import image3 from '../assets/images/image3.jpeg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpeg';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  addButton: {
    display: 'block',
    margin: '20px auto',
  },
}));

export default function Home() {
  const [cards, setCards] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  const images = [image1, image2, image3, image4, image5];
  
  

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    if (!jwt || !jwt.user) {
      console.error("User not authenticated");
      setCards([getDefaultCard()]);
      return;
    }


    listCards(jwt.user._id, {t: jwt.token },signal)
      .then(data => {
        if (data && !data.error) {
          setCards(data.length ? data : [getDefaultCard()]);
        } else {
            setCards([getDefaultCard()]);
        }
      });
      
  }, []);

  const getDefaultCard = () => ({
    title: 'Default Card',
    image: front,
    description: 'This is a default card because no user-specific cards were found.',
  });

  const handleAddCard = () => {
    navigate('/card/add');
  };

  return (
    <div>
      {cards.map((card, index) => (
        <Card key={index} className={classes.card}>
          <Typography variant="h6" className={classes.title}>{card.title}</Typography>
          <CardMedia className={classes.media} image={images[(Math.floor(Math.random() * images.length))*index]|| front} title={card.title} />
          <CardContent>
            <Typography variant="body2" component="p">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" className={classes.addButton} onClick={handleAddCard}>
        Create New Post
      </Button>
    </div>
  );
}
