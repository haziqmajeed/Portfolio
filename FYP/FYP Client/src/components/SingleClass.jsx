import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import userService from "../services/Userservice";
import NumberOfStudents from "./NumberOfStudents";
import InsideClass from "./InsideClass";
const SingleClass = (props) => {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    
  });
  const { product, onDelete, history } = props;
  console.log(props);
  const classes = useStyles();
  return (
    <Grid item xs={4} className={classes.Align}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="Pink.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.courseCode}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={(e) => {
            
            history.push("/InsideClass/"+product._id+"/"+product.code);
           
          }}>
          Open
        </Button>
        <Button size="small" color="primary" onClick={(e)=>{
          userService.DeleteClass(product._id).then((data)=>{
            console.log(data);
            onDelete();
          }).catch((err)=>{
            console.log(err);
          })
        }}>
          Remove
        </Button>
      </CardActions>
    </Card>
    </Grid>
    // <Grid item xs={4}>
    //   <h2>
    //     {product.name}
       
    //   </h2>
    //   <p>{product.teacherName}</p>
      
    // </Grid>
  );
};

export default withRouter(SingleClass);