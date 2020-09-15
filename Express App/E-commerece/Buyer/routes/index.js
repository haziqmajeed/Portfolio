var express = require('express');
var router = express.Router();
var userModel= require("../Models/user");
var productsModel= require("../Models/products");
var fs = require('fs');
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var orders= require("../Models/Orders");
const { Console } = require('console');
//let cart= [];
let products= [];
var mycar=[];
/* GET home page. */
router.get('/', async function(req, res, next) {
  let temp=[];
  let sellerProducts= await productsModel.find();
  //console.log(sellerProducts[0].products[1]._id)
  //console.log(sellerProducts[0].products.length)
  //console.log(getProducts(sellerProducts));
  temp=getProducts(sellerProducts);
  console.log("My Temp");
  console.log(temp);
  //console.log(getProducts(sellerProducts));
 //console.log(res.locals.user.name);
   res.render('index',{products:temp});
  
});



//showing in cart is here
router.get('/cart',checkSessionAuth, async function(req, res, next) {
  
  var cart=[];
  var tempCart=[];
  cart = req.cookies.cart;
  console.log("Cookies Cart");
  console.log(cart);
  if(!cart) cart=[];
  if(!tempCart) tempCart=[];
  mycar=[];
  for(var i=0;i<cart.length;i++)
  {
    if (cart[i].tempMail == [] || cart[i].tempMail == undefined){
      continue;
    }
      if(cart[i].tempMail.email == res.locals.user.email)
      {
        tempCart.push(cart[i].cartProduct);
        
        mycar.push(cart[i].cartProduct);
      }
  } 
    console.log("tempCart");
    console.log(tempCart);  
    console.log("mycar");
    console.log(mycar);  
 // console.log(cart[0].cartProduct);


  res.render('cart',{tempCart});
});

// ALi
router.get('/ShippingForm',async function(req,res){
    res.render("Pages/Shipping");
});
router.post('/ShippingForm',async function(req,res){ // Ali
    for(var i=0;i<mycar.length;i++)
    {
      var order = new orders();
      order.name= mycar[i].name;
      order.price= mycar[i].price;
      order.email= mycar[i].email;
      order.BuyerName= req.body.BuyerName;
      order.contact= req.body.contact;
      order.address= req.body.address;
      await order.save();
    }
    let cart=[];
    cart=req.cookies.cart;
    cart=[];
    res.cookie('cart',cart);
    res.redirect("/");
});

// Addind into the cart here
router.get('/product/cart/:id',checkSessionAuth, async function(req, res, next) {
  console.log("MY ID");
  console.log(req.params.id);
  cartProduct=getProductsById(req.params.id)
  //cartProduct=await productsModel.findById(req.params.id)
    const tempMail ={email:res.locals.user.email};
    var myCart= {cartProduct,tempMail};
    //Object.assign(cartProduct,tempMail);
    //console.log(myCart);

    let cart=[];
    if (req.cookies.cart) {
      cart = req.cookies.cart
    }
    
      
    cart.push(myCart);
    //console.log("CArttt");
    //console.log(cart);                                                        
   // console.log(cart[0].cartProduct);
    //console.log(cart.cartProduct);
    //console.log(cart[0].tempMail.email);
    res.cookie("cart", cart);
    res.redirect("/product/"+req.params.id)
});


// Cart remove button is here
router.get('/remove/:id', async function(req, res, next) {
  
 /* let flag=0;
  var cart=[];
  cart = req.cookies.cart;
  if(!cart) cart=[];
  for(var i=0;i<cart.length;i++)
  {
    if (cart[i].tempMail == [] || cart[i].tempMail == undefined){
      continue;
    }
      if(cart[i].cartProduct._id == req.params.id && flag==0)
      {
          delete cart[i].cartProduct;
          delete cart[i].tempMail;
          flag=1;
      }
  }
    res.cookie("cart", cart);
    
    res.redirect("/cart")*/

  /*  let cart= [];
    if (req.cookies.cart) cart = req.cookies.cart
    cart.splice(cart.findIndex(c=>c._id==req.params.id),1);
    res.cookie("cart", cart);
    res.redirect("/cart")*/
   
    let cart=[];
    
    if(req.cookies.cart) cart = req.cookies.cart;
   
    cart.splice(cart.findIndex((c)=>c.cartProduct._id ==  req.params.id),1);
    
    res.cookie("cart",cart);
    
    res.redirect('/cart');

    
});



//Seprate file created for each product
router.get('/product/:id', async function(req, res, next) {

    //temp=await productsModel.findById({ products: { _id: req.params.id } })
    //console.log(req.params.id);
    //console.log(getProductsById(req.params.id));
    oneProduct= getProductsById(req.params.id)
    
   
    fs.writeFile('views/ProductsPages/'+req.params.id+'.pug', 
    'extends ../layout\nblock content\n .row\n  .col-sm-12\n     img(class="image" id ="innerImage" style="width:30%;float:left" src="'+oneProduct.url+'")\n     h1 ' +oneProduct.name+ '\n     br\n     h2 Price: '+oneProduct.price+'\n      br\n hr\n div(class="row" id="extendableRow")\n    div(class="col-sm-12")\n        a(href="/product/cart/'+req.params.id+'" class="btn btn-info" onclick="something()" style="margin-left:2%") Add to cart\n        a(href="/" class="btn btn-warning" style="margin-left:2%") Buy Now\n        hr\n        p(style="display:none;font-size:32px;font-family:Lucida Console, Courier, monospace;color:red;" id="check") Hello\n h1 SPECIFICATION\n table(class="table")\n   tbody\n    th(style="color:Red;font-size: 28px") RAM\n    th '+oneProduct.ram+'\n   tbody\n    th(style="color:Red;font-size: 28px") MEMORY\n    th '+oneProduct.memory+'\n   tbody\n    th(style="color:Red;font-size: 28px") MAIN CAMERA\n    th 12 MP, f/1.8, 28mm (wide), 1/3", 1.22µm, dual pixel PDAF, OIS\n   tbody\n    th(style="color:Red;font-size: 28px") BATTERY\n    th Non-removable Li-Ion 2716 mAh battery (10.35 Wh)\n   tbody\n    th(style="color:Red;font-size: 28px") DISPLAY\n    th 1125 x 2436 pixels, 19.5:9 ratio (~458 ppi density)\n   tbody\n    th(style="color:Red;font-size: 28px") CHIPSET\n    th Apple A11 Bionic (10 nm)\n   tbody\n    th(style="color:Red;font-size: 28px") PLATFORM\n    th iOS 11.1.1, upgradable to iOS 13.6\n   tbody\n    th(style="color:Red;font-size: 28px") BODY\n    th 143.6 x 70.9 x 7.7 mm (5.65 x 2.79 x 0.30 in)'
    , async function (err) {
      if (err) throw err;
        console.log("File Done");
        res.render('ProductsPages/'+req.params.id);
    }); 
    

  
});




//Register page is here
router.get('/register', function(req, res, next) {
  res.render('Pages/register');
});


//Get User resistration data is here
router.post('/register',async function(req, res, next) {
  let user = new userModel(req.body);
  await user.save();
  res.redirect('/');
});





//log in page is here
router.get('/login', function(req, res, next) {
  res.render('Pages/login');
});




//It empty the session data to null
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/login');
});


//get login Page data is here
router.post('/login', async function(req, res, next) {
  let user = await userModel.findOne({email:req.body.email,password:req.body.password});
  if (!user) return res.redirect('/login');
  req.session.user = user;
  return res.redirect('/');
});

module.exports = router;

function getProducts(sellerProducts){
  products= [];
  let temporary= [];
  //console.log(sellerProducts[0].products[1]._id)
  //console.log(sellerProducts[0].products.length)
  for(i=0;i<sellerProducts.length;i++){
    for (j=0;j<sellerProducts[i].products.length;j++){
      //console.log(sellerProducts[0].email)
      products.push({
        _id:sellerProducts[i].products[j]._id,
        url:sellerProducts[i].products[j].url,
        name:sellerProducts[i].products[j].name,
        price:sellerProducts[i].products[j].price,
        ram:sellerProducts[i].products[j].ram,
        memory:sellerProducts[i].products[j].memory,
        email:sellerProducts[i].email,
      });

        
      //products.push(sellerProducts[i].products[j]);
      
    }
  }
  console.log("My Products");
  console.log(products);
  //console.log(temporary);
  return products;
}

function getProductsById(id){
  console.log(id);
  for (i=0;i<products.length;i++){  
    if(products[i]._id==id){
      return products[i];
    }
  }
  return "not Found";
}