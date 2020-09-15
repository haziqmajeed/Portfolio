import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import productsService from '../services/ProductsService';
const OpenPage = (props) => {

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
                <h1>Product Page</h1>
                <img src={url} style={{width:"30%"}}></img>
                <h1 style={{marginLeft:"2%"}}>{name}</h1>
                <p style={{marginLeft:"2%"}}><b>Price:</b>{price}/Rs</p>
                
        </Grid>
        
        
        
        
        


    </Grid> );
}
 
export default OpenPage;