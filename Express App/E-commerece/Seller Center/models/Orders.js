const mongoose= require("mongoose");

const OrderSchema = mongoose.Schema({
    name:String,
    price:Number,
    email:String,
    BuyerName:String,
    contact:String,
    address:String,
})

const Orders = mongoose.model("Orders",OrderSchema); // ak parameter me wo model dena ha jo ap ne mongo DB me rkha ha r ak me wo dena jo ap ka scehema yaha define kiya ha
module.exports= Orders;