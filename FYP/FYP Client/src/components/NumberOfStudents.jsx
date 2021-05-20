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
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import SingleClass from './SingleClass';
import { render } from '@testing-library/react';
import ReactDelayRender from 'react-delay-render';
import SingleStudent from './SingleStudent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const NumberOfStudents = (props) => {
  
    const drawerWidth = 300;

    const useStyles = makeStyles((theme)=> ({
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
          Align:{
            textAlign: 'center'
          },
          table: {
            minWidth: 650,
          },
          
      }));

      

    
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
     var flag =0;
     const [Students, setStudents] = React.useState([]);
     const getStudents = () => {
      userService
        .getStudentsOfClass(props.match.params.code).then((data) => {
          setStudents(data);
     
          console.log(data);
         
        })
        .catch((err) => {
          console.log(err);
        });
        
    };
    
    React.useEffect(getStudents, []);
    
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
            
            <Grid container spacing={3}>
          {Students.map((students, index) => (
               <TableContainer component={Paper}>
               <Table className={classes.table} aria-label="simple table">
              <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            </Table>
            </TableContainer>,
            <SingleStudent key={index} student={students} onDelete={getStudents} classCode={props.match.params.code}/>
          ))}
        </Grid>
          
            
        </main>
        
    </div>


           );
           
}
 
export default (NumberOfStudents);