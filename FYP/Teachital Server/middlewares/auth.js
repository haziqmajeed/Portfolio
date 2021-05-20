const jwt = require("jsonwebtoken");
const userModel = require("../Models/users");
async function auth(req,res,next){
    setTimeout(function() {
    }, 3000);
    let token = req.header("x-auth-token");
    console.log("sadsadsa",token);
    if(!token){
        res.send("token not provided!!");
    }
    try {
        let userdetails = jwt.verify(token,"someprivatekey");
    req.userdetails =await userModel.findById(userdetails._id);
    console.log("jojo",req.userdetails);
    
        
    } catch (error) {
        
        return res.send(error);
       
        
    }
    next();
}
module.exports = auth;