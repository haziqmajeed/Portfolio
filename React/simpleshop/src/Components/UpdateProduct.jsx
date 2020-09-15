import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import productsService from '../services/ProductsService';
const UpdateProduct = (props) => {

    const [name,setName]=React.useState(""); 
    const [price,setPrice]=React.useState(0);
    const [url,setUrl]=React.useState("");
    console.log(props.match.params.product_id);

    const product = () => {
       productsService.getSingle(props.match.params.product_id).then((data)=>{
           setName(data.name);
           setPrice(data.price);
           setUrl(data.url);
        }).catch((err)=>{console.log(err)});
    };

    
    
    
    React.useEffect(product,[]);
   
     
    

    return ( <Grid container spacing={3}>
        <Grid item xs={12}>
                <h1>Update Product</h1>
                
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
           productsService.updateProduct(props.match.params.product_id,{name,price,url}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)});
           props.history.push("/")

        }}>
            Update
        </Button>
        </Grid>
        
        


    </Grid> );
}
 
export default UpdateProduct;