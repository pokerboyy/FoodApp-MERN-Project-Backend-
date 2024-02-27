const express=require('express')
const bookingRouter=express.Router();
const bodyParser = require('body-parser');
const { protectRoute }=require('../helper')
const { createSession }=require('../controller/bookingController');
const path = require('path');
const  { sendMail }  = require('../utility/nodemailer');
const sharedState = require("../controller/idx");
// const app=express()
bookingRouter.use(express.static("public")); 
// app.use(bodyParser.urlencoded({ extended: true }));

 bookingRouter.route('/createSession').get(function (req,res)
 {
//   console.log("hllo booking router");
//    res.sendFile("D:\BackEnd Abhishek\FOODAPP\index.html");
console.log("hello booking router");
const filePath = 'index.html';
res.sendFile(filePath, { root: 'D:/BackEnd Abhishek/FOODAPP (BackEnd)/' });
 })
//  bookingRouter.use(protectRoute)
 bookingRouter.route('/createSession').post(createSession)
 module.exports=bookingRouter;

//  D:\BackEnd Abhishek\FOODAPP (BackEnd)\index.html