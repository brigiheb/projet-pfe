const jwt = require("jsonwebtoken")
const db = require("../models");
const User = db.users;

module.exports = async (req,res,next)=>{
    try {
        const privateKey = "PINOPS TEAM"
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token, privateKey);
        console.log(decodedToken);
        const userID = decodedToken.id;
        const user = await User.findByPk(userID)
        req.user = user
        // console.log(user); 
        if(user){
            next();
        }else{
            throw Error ('Invalid user ID');
        }   
    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
}