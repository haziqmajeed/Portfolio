var mongoose = require("mongoose");

var productsSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    products: [{
        url: { type: String, default: 1 },
        name: { type: String, default: '', trim: true },
        price: { type: Number, default: 0, trim: true },
        ram: { type: String, default: '', trim: true },
        memory: { type: String, default: '', trim: true },
    }]
});

const productsModel = mongoose.model("User", productsSchema);
module.exports = productsModel;