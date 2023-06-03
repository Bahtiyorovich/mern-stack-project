const jwt = require("jsonwebtoken")
const {config} = require("dotenv")
config()

const auth = (req, res, next)=>{
    const token = req.header("token")
    if(!token){
        return res.status(404).json({state: false, msg:"Token not found", innerData:null})
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded)=>{
        if(err){
            return res.status(400).json({state: false, msg:"Token is incorrect", innerData:null})
        }
        req.user = decoded
        next()
    })
}

module.exports = { auth }