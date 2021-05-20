import React, { useEffect } from 'react';
import { AppBar,Grid, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import userService from '../services/Userservice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import JoinedSingleClass from './JoinedSingleClass';
import { Class, LaptopWindows } from '@material-ui/icons';
import InsideStudentClass from './InsideStudentClass';


const StudentProfile = (props) => {
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
            marginTop:'0',
          },
          content: {
            flexGrow: 1,
            padding: theme.spacing(),
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
          },
         
          Align:{
            textAlign: 'center'
          }
          
      }));

      const h1Align = {
        textAlign:"center"
     }

    
    const classes = useStyles();
    const theme = useTheme();
    const { history } = props;
    const [open, setOpen] = React.useState(false);

    const itemsList = [
      {
        text: "Home",
        icon: <AddCircleOutlineOutlinedIcon />,
        onClick: () => history.push("/StudentProfile"),
        
      },
        {
          text: "Join New Class",
          icon: <AddCircleOutlineOutlinedIcon />,
          onClick: () => history.push("/JoinNewClass"),
          
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
     const addNewClass = {
      
      marginLeft:"90%",
      marginTop:15,
      
     
       }
     
      
     //join class
     const [opened, setOpened] = React.useState(false);
     const handleClickOpen = () => {
      setOpened(true);
    };
  
    const handleClose = () => {
      setOpened(false);
    };

    //geting code of class
    const [code, setCode] = React.useState("");

    
   
    const [details,setDetails] = React.useState([])

    //class name print
    const getUsers = () => {
      userService.GetStudentClasses().then((data)=>{
          setDetails(data)
          console.log("Given data ",data)
      })
      .catch(err=>{
        console.log("Hello there is error")
          console.log(err)
      })
  }
  console.log("uhdasuh",details)
  // useEffect(()=>{
  //   const getUsers = async () => {
  //         await userService.GetClasses().then((data)=>{
  //             setDetails(data)
  //             console.log("Given data ",data)
  //         })
  //         .catch(err=>{
  //           console.log("Hello there is error")
  //             console.log(err)
  //         })
  //     }
  //     getUsers()
  // },[])
    React.useEffect(getUsers,[]);
    console.log("Getting all Classes");

    
    

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

                <h1><b>Student Profile</b></h1>
            
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

        <main className={classes.content}>
            <div className={classes.drawerHeader} >

            </div>
          
            <Fab style={addNewClass} color="primary" aria-label="add" onClick={handleClickOpen} >
                <AddIcon />
            </Fab>
          
           
        <Dialog open={opened} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join Class</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Class Code:
            Ask You Teacher for class code,then enter it here.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class Code"
            type="text"
            value={code}
            onChange={(e) => {setCode(e.target.value);}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          
          color="primary"
          onClick={e=>{
            handleClose()
            userService.addClass({code}).then(data=>{
              console.log("helloooooo..............................",data)
            }).catch(err=>{
              console.log(err)
            })
            getUsers()         
          }}
          >
            Join
          </Button>
        </DialogActions>
        
      </Dialog>
     

      
      
      <Grid container spacing={3} className={classes.Align}>
       
      {details.length === 0 ? (
        <p>There are no Classes</p>
      ) : (
        <>
           {details.map((product, index) => (
            <JoinedSingleClass key={index} product={product} />
            
          ))} 
        </>
      )}
      

           
      
       
       
      </Grid>
            
      

        </main>
    </div>
    
    );
}

 
export default StudentProfile;