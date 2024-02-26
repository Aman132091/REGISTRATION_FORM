require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require('../Models/user')

const authmiddleware = async(req,res,next)=>{
    const token =req.headers['authorization']



    if (!token){
        return res.status(401).json({message:'Authentication Failed'})
    }

    try {
        const decode =jwt.verify(token,process.env.SECRET_JWT)
        console.log(decode);
        req.user = await User.findById(decode.userId)
        next()
        }catch (error) {
            console.error(error);
            res.status(401).json({message:'Not Verified'})
        }

}

module.exports = authmiddleware