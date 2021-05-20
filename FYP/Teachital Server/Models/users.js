var mongoose = require('mongoose');
 var userSchema = mongoose.Schema({
     name: String,
     status:String,
     email:String,
     password:String,
 });
var User = mongoose.model("Users",userSchema);
module.exports = User;