var express = require('express');
var router = express.Router();
var User = require("../models/user")
var bcrypt = require('bcryptjs');

/* GET users listing. */
//sign up
router.get('/register', function (req, res, next) {
  res.render("users/register");
});
router.post('/register', async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email Already Exist");
  user = new User(req.body);
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  await user.save();
  res.redirect("/");
});

//login
router.get('/login', function (req, res, next) {
  res.render("users/login");
});
router.post('/login', async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User is not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password")
  if (!user) return res.redirect("/login");
  req.session.user = user;

  return res.redirect("/products");
  //res.render("users/login");
});

//log out
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.redirect("/login");
});



module.exports = router;
