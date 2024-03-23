import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../lib/auth-helper'
import { Link, useNavigate, useLocation } from 'react-router-dom';

const theme = createTheme({
    palette: {
      primary: {
        main: '#616161', // Grey
      },
      secondary: {
        main: '#ff9800', // Orange
      },
      // Adjust text & icon default color
      text: {
        primary: '#ff9800', // Orange
        secondary: '#ffffff',
      },
    },
  });

  const isActive = (location, path) => {
    return location.pathname === path ? { color: theme.palette.secondary.main } : { color: theme.palette.text.secondary };
  };

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="textPrimary">
                    Code Crew
                </Typography>
                <Link to="/">
                    <IconButton aria-label="Home" style={isActive(location, "/")}>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to="/users">
                    <Button style={isActive(location, "/users")}>Users</Button>
                </Link>
                {
                    !auth.isAuthenticated() && (<span>
                        <Link to="/signup">
                            <Button style={isActive(location, "/signup")}>Sign up
                            </Button>
                        </Link>
                        <Link to="/signin">
                            <Button style={isActive(location, "/signin")}>Sign In
                            </Button>
                        </Link>
                    </span>)
                }
                {
                    auth.isAuthenticated() && (<span>
                        <Link to={"/user/" + auth.isAuthenticated().user._id}>
                            <Button style={isActive(location, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                        </Link>
                        <Button color="inherit" onClick={() => {
                            auth.clearJWT(() => navigate('/'));
                        }}>Sign out</Button>
                    </span>)
                }
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
}
