import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    link:{
        color: "white",
        paddingLeft : "1rem",
        textDecoration: "none",
    }
  }));
  



const TopMenu = () => {
    const classes = useStyles();
    return ( 
    <AppBar position="static" >
    <Toolbar >
      <IconButton edge="start"  color="inherit" aria-label="menu">
       
      </IconButton>
      <Typography variant="h4" >
        Simple Shop
      </Typography>
      <Typography variant="h6" >
      <Link to="/" className={classes.link}>Home</Link>
      </Typography>
      <Typography variant="h6" >
      <Link to="/Categories" className={classes.link}>Categories</Link>
      </Typography>
     
      
      <Button color="inherit" >Login</Button>
    </Toolbar>
  </AppBar> );
}
 
export default TopMenu;