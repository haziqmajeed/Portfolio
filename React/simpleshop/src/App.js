// npm i react-router-dom
// npm install @material-ui/core
// npm i axios
// npm install @material-ui/icons
import React from 'react';
import './App.css';
import TopMenu from './Components/TopMenu';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Categories from './Components/Categories';
import PageNotFound from './Components/PageNotFound';
import axios from 'axios';
import OpenPage from './Components/OpenPage';
import AddNew from './Components/AddNew';
import UpdateProduct from './Components/UpdateProduct';



  

function App() {
  const [products , setProducts] = React.useState([])
  const getData = () => {
      axios
    .get("http://localhost:4000/api/products")
    .then((res) => {
      setProducts(res.data); // set products with the response data
    })
    .catch((err) => {
      console.log(err);
    });
  };
  React.useEffect(getData,[]);
  



  return (
    <Router>
    <div>
        <TopMenu/>
       <Switch>
        
          <Route path="/Categories" component={Categories}/> 
          <Route path="/Not-Found" component={PageNotFound}/>
          <Route path="/AddNew" component={AddNew}/>
          <Route path="/update/:product_id" component={UpdateProduct}/>
          <Route path="/openPage/:product_id" component={OpenPage}/> 
          <Route path="/" exact component={HomePage}/> 
          <Redirect to="Not-Found"/>
       </Switch>
    </div>
    </Router>
  );
}



export default App;
