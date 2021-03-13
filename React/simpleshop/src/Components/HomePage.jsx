import React from 'react';
import axios from 'axios';
import DisplayProduct from './DisplayProduct';
import { Grid, Fab } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import productsService from '../services/ProductsService';

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));



const HomePage = (props) => {
    
    const classes = useStyles(); // for styling




    const [products , setProducts] = React.useState([])
    const getData = () => {
        productsService.getProduct()
      .then((data) => {
        setProducts(data); // set products with the response data
      })
      .catch((err) => {
        console.log(err);
      });
    };
    React.useEffect(getData,[]);



// here we are navigating to add new page 


    const handleNewProductClick = () => {
      props.history.push("/AddNew")
    }




    return ( <div>
        <h1>HomePage</h1>
		
        {products.length === 0 ? (<div>No products</div>):
		(<Grid container spacing={1}>
            {products.map( (product,index) => (
                <DisplayProduct key={index} product={product} onDelete={getData} props={props}/>
         ))}
        </Grid>)
            }
            
            <Fab color="primary" aria-label="add" className={classes.addBtn} onClick={handleNewProductClick}> 
            <AddIcon />
</Fab>
    </div> );
}
 
export default HomePage;