import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import front from '../assets/images/front.jpeg';

const useStyles = makeStyles(theme => ({
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
}));
export default function Home() {
    const classes = useStyles()
    return (
        <div>
        <Card className={classes.card}>

            <Typography variant="h6" className={classes.title}>CodeCrew</Typography>
            <CardMedia className={classes.media}
                image={front} title="Freelancer" />
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to CodeCrew.
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.card}>
                <Typography variant="h6" className={classes.title}>Second Card</Typography>
                <CardMedia className={classes.media} image={front} title="Second Image" />
                <CardContent>
                    <Typography variant="body2" component="p">
                        This is the Second Card with Different Content.
                    </Typography>
                </CardContent>
        </Card>
        </div>
        
    )
}

