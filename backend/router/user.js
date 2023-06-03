const express = require("express")
const router = express.Router()
const { Users, validateUser } = require("../models/userSchema.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {config} = require("dotenv")
config()
const {auth} = require('../middleware/auth.js')


router.get("/", auth, async(req, res)=>{
    try{
        const users = await Users.find().sort({_id: -1}).select({password:0})
        
        res.status(200).json({ state: true, msg:"all users were found", innerData: users })
    }
    catch{
        res.status(500).json({ state: false, msg: "server error", innerData: [] })
    }
})

// Sign up
router.post("/sign-up", async(req, res)=>{
    try{
        const {error} = validateUser(req.body)
        if(error){
            return res.status(400).json({state: false, msg: error.details[0].message, innerData:null})
        }
        const validUsername = await Users.findOne({username: req.body.username})
        if(validUsername){
            return res.status(400).json({state: false, msg: "username is taken", innerData:null})
        }
        // hash - parolni yashirish
        let salt = 8
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const newUser = await Users.create(req.body)
        res.status(201).json( {state:true, msg: "user is created", innerData: newUser} )
    }
    catch{
        res.status(500).json({ state: false, msg: "server error", innerData: null })
    }
})


// Sign in
router.post("/sign-in", async(req, res)=>{
    try{
        const {username, password} = req.body
        const user = await Users.findOne({username})
        if(!user){
            return res.status(404).json({state: false, msg: "username or password is incorrect", innerData: null})
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                // Create Token
                const token = jwt.sign(
                    {username, _id: user._id, isAdmin: false}, // payload - tokenda ketadigon malumot
                    process.env.PRIVATE_KEY, // token himoya qiliw uchun
                    { expiresIn: 60 } // 60 sekund da eskiradi
                    )

                res.status(200).json({state: true, msg:"successfully sign in", innerData: {user, token}})
            }else{
                res.status(404).json({state: false, msg: "username or password is incorrect", innerData: null})
            }
        });
    }
    catch{
        res.status(500).json({ state: false, msg: "server error", innerData: null })
    }
})


module.exports = router