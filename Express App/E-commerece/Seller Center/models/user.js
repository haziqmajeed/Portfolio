var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
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

const User = mongoose.model("User", userSchema);
module.exports = User;