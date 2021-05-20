var mongoose = require('mongoose');
 var relationalSchema = mongoose.Schema({
     classCode: String,
     studentEmail:String
 });
var Relation = mongoose.model("relational",relationalSchema);
module.exports = Relation;