import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import InsideStudentClass from './InsideStudentClass';

const JoinedSingleClass = (props) => {

    const useStyles = makeStyles({
        
        card: {
          maxWidth: 250,
          marginLeft:30,
          marginTop: 30
        },
        media: {
          height: 140,
          backgroundColor:"#566E7A"
        },
        
      });

    const { product, history } = props;
    console.log(props);
    const classes = useStyles();

    return ( 
        <Grid item xs={3} className={classes.Align}>
        <Card className={classes.card}>
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
            {product.teacherName}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={(e) => {
            
            history.push({pathname:"/InsideStudentClass/"+product._id+"/"+product.code,
          teacherName: product.teacherName});
            
          }}>
          Open Class
          
        </Button>
        <Button size="small" color="primary">
          Remove Class
        </Button>
      </CardActions>
    </Card>
      </Grid>
     );
}
 
export default withRouter(JoinedSingleClass);