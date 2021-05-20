var express = require('express');
var router = express.Router();
var users = require('../Models/users');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.post('/register',async function(req, res, next) {
  let user = await users.findOne({email:req.body.email});
  if(user){
    return res.status(400).send("Email already exists!!!");
  }
  else{
    user = new users();
    user.name = req.body.name;
    user.status = req.body.status;
    user.email = req.body.email;
    user.password = req.body.password;
    var salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(user.password,salt)
    await user.save();
    res.send(_.pick(user,["name","email"]));
  }
   
});
router.post('/login',async function(req, res, next) {
  let user = await users.findOne({email:req.body.email});
  if(!user){
    return res.status(400).send("User not Registered!!!");
  }
  else{
    let password =await  bcrypt.compare(req.body.password,user.password);
    if(!password){
      return res.send("Password not matched!!!");
    }
    else
    {
      let token = jwt.sign({_id:user._id,name:user.name,email:user.email,status:user.status,password:user.password},"someprivatekey");
      res.send(token);
    }
    
  }
   
});

module.exports = router;
