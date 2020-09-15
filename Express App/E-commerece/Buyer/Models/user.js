const mongoose= require("mongoose");

const user = mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const userModel = mongoose.model("buyers",user); // ak parameter me wo model dena ha jo ap ne mongo DB me rkha ha r ak me wo dena jo ap ka scehema yaha define kiya ha
module.exports= userModel;