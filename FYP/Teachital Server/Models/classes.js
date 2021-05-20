var mongoose = require('mongoose');
 var classesSchema = mongoose.Schema({
     name: String,
     courseCode:String,
     teacherName:String,
     teacherEmail:String,
     code:String
 });
var Class = mongoose.model("Classes",classesSchema);
module.exports = Class;