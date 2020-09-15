var express = require('express');
var router = express.Router();
var orders= require("../models/Orders");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Orders',async function(req, res, next) {
  
    console.log("HEllo");
  
  
    let order = await orders.find({email:res.locals.user.email});

    res.render('Orders',{order});
  
  
});
router.get('/OrderDelete/:id',async function(req, res, next) {
  
  console.log("HEllo Dear");


  let order = await orders.findByIdAndDelete(req.params.id);

  res.redirect('/Orders');


});

module.exports = router;
