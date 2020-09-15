var express = require('express');
var router = express.Router();
var Product = require("../models/product");
var User = require("../models/user")
var checkSessionAuth = require("../middlewares/checkSessionAuth")
let count=0;


/* GET home page. */
router.get('/',checkSessionAuth, async function (req, res, next) {
 // let products = await Product.find(); ye
  let user = await User.findOne({ email: res.locals.user.email });
  res.render("products/list", { title: "Products List", products: user.products });
});
//add product
router.get('/add', checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
});
router.post('/add',checkSessionAuth, async function (req, res, next) {

 // let product = new Product(req.body);  ye
  let user = await User.findOne({ email: res.locals.user.email });
  user.products.push(req.body)
  console.log(user);
  await user.save();
  //await product.save(); ye
  res.redirect("/products");
});

//edit 
router.get('/edit', checkSessionAuth, async function (req, res, next) {
  //let products = await Product.find(); ye
  let user = await User.findOne({ email: res.locals.user.email });
  res.render("products/edit", { title: "Products List", products: user.products});
});

//delete a product
router.get('/delete/:id',checkSessionAuth, async function (req, res, next) {
  
  //let user = await User.product.findByIdAndDelete(req.params.id);
  let user = await User.findOne({ email: res.locals.user.email });
      await User.update(
        {_id: user._id},
        { $pull: { products: { _id: req.params.id } } }
      )
  res.redirect("/products/edit");
});

//Update a product
router.get('/update/:id', async function (req, res, next) {
  //let product = await Product.findById(req.params.id);
  let product;
  let user = await User.findOne({ email: res.locals.user.email });
  for (i=0;i<user.products.length;i++){
    
    if(String(user.products[i]._id)==req.params.id){ 
      product=user.products[i]
        break;
    }
  }

  res.render("products/update", { product : product });
});
router.post('/update/:id',checkSessionAuth, async function (req, res, next) {
  let user = await User.findOne({ email: res.locals.user.email });   
  for (i=0;i<user.products.length;i++){
    
    if(String(user.products[i]._id)==req.params.id){
      user.products[i].url= req.body.url
      console.log(req.body.name)
      console.log(user.products[i].name)
      user.products[i].name= req.body.name
      user.products[i].price= req.body.price
      break;
    }
  }
  await user.save();
  res.redirect("/products/edit");
});
module.exports = router;
