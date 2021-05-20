import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import userService from "../services/Userservice"
import {toast} from 'react-toastify';

const Signup = (props) => {
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(0.1),
          minWidth: 350,
        },
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
    
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
      setStatus(event.target.value);
    };

    return ( 
        <Grid>
            <Paper elevation={15} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2><i><b>Sign Up</b></i>
                    </h2>
                </Grid>

                <TextField label="Full Name" placeholder="Enter your name here" type="text" fullWidth required value={name} onChange={(e) => {setName(e.target.value);}} />
                <TextField style={textfieldStyle} label="Email" placeholder="Enter your email here" type="email" fullWidth required value={email} onChange={(e) => {setEmail(e.target.value);}} />
                <TextField style={textfieldStyle} label="Password" placeholder="Enter your password here" type="password" fullWidth required value={password} onChange={(e) => {setPassword(e.target.value);}}/>

                <FormControl style={textfieldStyle} className={classes.formControl}>
            
                    <InputLabel id="demo-simple-select-label" required>Status</InputLabel>
                    <Select
                    value={status}
                    onChange={handleChange}
                    >
                    <MenuItem value= "Teacher">Teacher</MenuItem>
                    <MenuItem value = "Student">Student</MenuItem>
                    </Select>
                </FormControl>

                <Button style={textfieldStyle} type="submit" color="primary" variant="contained" fullWidth
                onClick={(e)=>{
                    userService.addUser({name,status,email,password}).then((data)=>{
                    
                    console.log("Billo baggy billian da",data)
                    toast.success("User Registered Successfully", {
                        position: toast.POSITION.TOP_LEFT
                      });
                    props.history.push("/Login")
      
                    }).catch(err=>{
                      console.log(err)
                      toast.error(err.response.data, {
                        position: toast.POSITION.TOP_LEFT
                      });
                    })
                    console.log("User Registered...")
                }}
                >Sign up</Button><br/>
                <br/>
                <Typography variant="subtitle1">
                Already have an account?<span>        </span>
                    <Link to="/Login" className={classes.Link}>
                      Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
        

     );
}
 
export default Signup;