"use strict";
const nodemailer = require("nodemailer");
module.exports.sendMail=async function(str,data){
const transporter = nodemailer.createTransport({
  host:  "smtp.gmail.com",
  port: 587,
  secure: false, //true for 465 port, false for other ports
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'preritchauhan123@gmail.com',
    pass: 'lktzjuocokahgfzu'
  }
});

// async..await is not allowed in global scope, must use a wrapper
let eSubj,eHtml;
if(str=="signup"){
  // send mail with defined transport object
  eSubj=  `Thanks for signing up ${data.name}`;
  eHtml=
    `<h1>Thanks for signing up ${data.name}</h1>    
    Hope you have a great experience
    Here are your details:
    Name-${data.name}
    Email-${data.email}
    `
}else if(str=="forgetpassword"){
    eSubj=  `Reset your password`;
    eHtml=
    `<h1>foodApp.com</h1>
    Here is your link to reset password :${data.resetPasswordLink}
    `;
}else if(str=="mealPlanBuy")
{
  eSubj=  `Meal Plan Bought`;
  eHtml=
  `<h1>foodApp.com</h1>
  Congrats.You have brough a meal plan. Here's your details: Psuedo Data
  `;
}
  let info = await transporter.sendMail({
    from: '"FoodApp 🥗"  <preritchauhan123@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: eSubj, // Subject line
    // text: "Hello world?", // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

