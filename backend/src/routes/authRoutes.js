const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const router = express.Router();

router.post("/signup", async (req,res)=>{

const {username,email,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({
username,
email,
password:hashedPassword
});

await user.save();

res.json({message:"User created"});

});

router.post("/login", async (req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json({message:"User not found"});
}

const match = await bcrypt.compare(password,user.password);

if(!match){
return res.status(400).json({message:"Wrong password"});
}

const token = jwt.sign({id:user._id},"secretkey");

res.json({token});

});

module.exports = router;