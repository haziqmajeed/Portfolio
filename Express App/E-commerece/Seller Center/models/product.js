var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    url: String,
    name: String,
    price: Number,
    ram: String,
    memory: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
