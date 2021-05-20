var mongoose = require('mongoose');
 var videoSchema = mongoose.Schema({
     email:String,
     classCode:String,
     title: String,
     description:String,
     filePath:String,
     VideoDuration:String,
     ThumbnailsPath:String,
 });
var Video = mongoose.model("video",videoSchema);
module.exports = Video;