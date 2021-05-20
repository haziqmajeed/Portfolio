import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import userService from '../services/Userservice';
import { Avatar, Grid, Paper, TextField } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import {toast} from 'react-toastify';
const CreateClass = (props) => {
    
    
    const drawerWidth = 300;

    const useStyles = makeStyles((theme)=> ({
        Link:{
           
            textDecoration: "none",
        },
        root: {
            display: 'flex',
          },
         appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor:"#0C0C0C"
          },
        appBarShift: {
            width: `calc(150% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
          menuButton: {
            marginRight: theme.spacing(2),
          },
          hide: {
            display: 'none',
          },
          drawer: {
            width: drawerWidth,
            flexShrink: 0,
          },
          drawerPaper: {
            width: drawerWidth,
            backgroundColor:"#566E7A",
            color:"white"
          },
          drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
            marginTop:'5%',
          },
          content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
          },
          buttondown: {
            marginTop: '20px',
          },
          
      }));
      

    const paperStyle = {
        padding: "20px",
        height: "70vh",
        width:"350px",
        margin:"70px auto"
    }

    const avatarStyle = {
        backgroundColor:"#17655c"
    }

   const textfieldStyle1 = {
       marginTop:"15px"
    }

    const checkboxStyle = {
        marginTop:"10px"
    }
      

    
    const classes = useStyles();
    const theme = useTheme();
    const { history } = props;
    const [open, setOpen] = React.useState(false);

    const itemsList = [
        {
            text: "Home",
            icon: <AddCircleOutlineOutlinedIcon />,
            onClick: () => history.push("/TeacherProfile")
          },
        {
          text: "Create New Class",
          icon: <AddCircleOutlineOutlinedIcon />,
          onClick: () => history.push("/TeacherCreateNewClass")
        },
        {
          text: "Update Profile",
          icon: <UpdateOutlinedIcon />,
          onClick: () => history.push("/UpdateProfile")
        },
        {
          text: "Settings",
          icon: <SettingsOutlinedIcon />,
          onClick: () => history.push("/Setting")
        },
        
      ];


    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const textfieldStyle = {
      marginLeft:"8%",
      marginTop:"8%"
        
     }
     
     const [ClassName, setClassName] = React.useState("");
     const [CourseCode, setCourseCode] = React.useState("");
     const [TeacherName, setTeacherName] = React.useState("");
    return ( 
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        >
        
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            >
            
            <MenuIcon/>
            </IconButton>

           
                <h1><b>Teacher Profile</b></h1>
            

            
            

        </Toolbar>
        </AppBar>
        
        
        
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
        
        

        <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        
        <Divider/>

        <List variant="permanent" className={classes.drawer}>
            
                
                    {itemsList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText primary={text} />
                        </ListItem>
                    );
                    })}
                
            {!userService.isLoggedIn() ? (
                <>  
                </>
            ) : (
            
            <Button 

            style={textfieldStyle}
            color="primary" variant="contained" 
                onClick={(e) => {
                userService.logout();
                window.location.href="/";
                }}
            >
            <ExitToAppIcon />
                Log Out : {userService.getLoggedInUser().name}
            </Button>
        )}
            
        </List>
        <Divider/>
        </Drawer>

        <main className={classes.content} >

            <div className={classes.drawerHeader} ></div>
            <Typography paragraph>
            <Grid>
        <Paper elevation={15} style={paperStyle}>
            <Grid align="center">
                <Avatar style={avatarStyle}><LockOpenOutlinedIcon/></Avatar>
                <h2><i><b>Create New Class</b></i></h2>
                
            </Grid>
            <TextField  label="Class Name" placeholder="Enter your class name here" type="name"  onChange={(e) => {setClassName(e.target.value);}} fullWidth required/>
            <TextField  label="Couse Code" placeholder="Enter your course code here" type="coursecode" onChange={(e) => {setCourseCode(e.target.value);}} fullWidth required/>
            <TextField  label="Teacher Name" placeholder="Enter your name here" type="teachername"  onChange={(e) => {setTeacherName
                (e.target.value);}} fullWidth required/>
            <Button className={classes.buttondown} type="submit" color="primary" variant="contained" fullWidth
                onClick={e=>{
                    userService.CreateClass({ClassName,CourseCode,TeacherName}).then(data=>{
                      console.log(data)
                    
                      {userService.isTeacher() ? (
                        props.history.push("/TeacherProfile")
                    ) : (
                        props.history.push("/StudentProfile")
                     )}
                      toast.success("User Successfully Logged In", {
                        position: toast.POSITION.TOP_LEFT
                      });
                    }).catch(err=>{
                      console.log(err)
                      toast.error(err.response.data, {
                        position: toast.POSITION.TOP_LEFT
                      });
                    })                  
                  }}
                >Create</Button>
        </Paper>
    </Grid>
            </Typography>
            

            
        </main>
        

    </div>


    );
}
 
export default CreateClass;