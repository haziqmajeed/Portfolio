import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import userService from "../services/Userservice"
import {toast} from 'react-toastify';
import TeacherProfile from './TeacherProfile';
import StudentProfile from './StudentProfile';

const Login = (props) => {
    console.log(localStorage.getItem('token'))
    const useStyles = makeStyles((theme) => ({
        Link:{
           
            textDecoration: "none",
        }
      }));

      const classes = useStyles();

    const paperStyle = {
        padding: "20px",
        height: "70vh",
        width:"350px",
        margin:"70px auto"
    }

    const avatarStyle = {
        backgroundColor:"#17655c"
    }

    const textfieldStyle = {
       marginTop:"15px"
    }

    const checkboxStyle = {
        marginTop:"10px"
    }

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    

    return ( 
        <Grid>
            <Paper elevation={15} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOpenOutlinedIcon/></Avatar>
                    <h2><i><b>Welcome to Teachital</b></i></h2>
                    <h3><i><b>Sign In</b></i>
                    </h3>
                </Grid>
                
                <TextField  label="Username" placeholder="Enter your username here" type="email" value={email} onChange={(e) => {setEmail(e.target.value);}} fullWidth required/>
                <TextField style={textfieldStyle} label="Password" placeholder="Enter your password here" type="password" value={password} onChange={(e) => {setPassword(e.target.value);}} fullWidth required/>

                <FormControlLabel style={checkboxStyle}
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                />
                <br/>
                <Button type="submit" color="primary" variant="contained" fullWidth
                onClick={e=>{
                    userService.login(email,password).then(data=>{
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
                      console.log("sdsadasd",err)
                      toast.error(err.response.data, {
                        position: toast.POSITION.TOP_LEFT
                      });
                    })
                                      
                  }}
                >Sign in</Button><br/>
               <br/>
                <Typography variant="subtitle1" >
                Don't you have an account?<span>        </span>
                    <Link to="/Signup" className={classes.Link}>
                      Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
        
        
     );
}
 
export default Login