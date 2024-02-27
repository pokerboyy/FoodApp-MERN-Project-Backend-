const express=require("express");

const authRouter=express.Router();
const userModel=require('../models/userModel')
var jwt=require("jsonwebtoken");
const {JWT_KEY}="zdsfxcg234w5e6cg"; 



module.exports = authRouter;