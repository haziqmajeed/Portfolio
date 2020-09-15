import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import productsService from '../services/ProductsService';
const AddNew = (props) => {

    const [name,setName]=React.useState("");
    const [price,setPrice]=React.useState(0);
    const [url,setUrl]=React.useState("");

    return ( <Grid container spacing={3}>
        <Grid item xs={12}>
                <h1>Add New Product</h1>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
        <TextField id="standard-basic" label="Name" fullWidth value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <TextField id="standard-basic" label="Price" fullWidth value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        <TextField id="standard-basic" label="URL" fullWidth value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}> </Grid> 
        <Grid item xs={9}>
        <Button variant="contained" color="primary" 
        onClick={(e)=>{
            productsService.addProduct({name,price,url})
      .then((data) => {
        console.log(data); // Print successfully added data
        console.log(props);
        props.history.push("/");
    })
      .catch((err) => {
        console.log(err);
      });

        }}>
            Add Product
        </Button>
        </Grid>
        
        


    </Grid> );
}
 
export default AddNew;