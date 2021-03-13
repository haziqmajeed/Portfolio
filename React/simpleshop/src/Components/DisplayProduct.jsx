import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import productsService from '../services/ProductsService';





const DisplayProduct = ({product, onDelete,props}) => { // yaha props nhi thay built in kio ke ye props Route walay tag se aty hain or is componenet ko route walay tag me use nhi kia
    console.log(props);
    return ( <Grid container item xs={4} >

	<div>
	
        <img src={product.url} style={{width:"200px"}}></img>
		
        <Link to={"/openPage/"+product._id} style={{textDecoration:"none"}}><h4>{product.name}</h4></Link>
		
		
        <p><b>Price:</b>{product.price}/Rs</p>
		
		
        <Button variant="contained" color="secondary" onClick={
            (e)=>{productsService.deleteProduct(product._id)
            .then((data)=>{
                console.log(data)
                onDelete();
            })
            .catch((err)=>{console.log(err)})}}
            >
			Delete
			
			</Button>
			
			
        <Button variant="contained" color="primary" style={{marginLeft:"20px"}}
		onClick={(e)=>{props.history.push("/update/"+product._id)}}
        >
		
		Edit
        </Button>
        
            
    </div> </Grid>);
}
 
export default DisplayProduct;