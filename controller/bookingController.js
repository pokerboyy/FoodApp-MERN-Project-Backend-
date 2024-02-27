let SK="sk_test_51NZXUCSGQyuzcSaeWpCGFVvxxrvQS0cJlTRGpeztepyG6aff4gv4CoWoZG6WxrraaSVTyD8wxwIuVX9yV8FDCn8Q00AWUl5v50";
const stripe=require("stripe")(SK)

const { sendMail } = require("../utility/nodemailer");


const planModel = require("../models/planModel")
const userModel = require("../models/userModel")
const sharedState = require('./idx.js');
module.exports.createSession=async function(req,res,next)
{
    console.log("hello stripe session");
    console.log("hello dost3",sharedState.x);
    // additionalData
    try{
      

        const session=await stripe.checkout.sessions.create({
            line_items:[
                {
                    // price_data:"HealthyFood101",
                    // amount:"1234",
                    // currency:"inr",
                    // quantity:1,
                    price_data: {
                        currency: 'inr',
                        unit_amount: sharedState.x*100,
                        product_data: {
                            name:sharedState.name
                        }
                    },
                    quantity: 1,
                }
            ],
            mode:"payment",
            success_url:`${req.protocol}://localhost:3000`,
            cancel_url:`${req.protocol}://${req.get("host")}/profile`,
        })  
      res.redirect(303,session.url);
      
       
   
        
    }catch(err)
    {
        res.json({
            msg:err.message
        })
    
    }
        console.log("hello bro")
        console.log("hello booking router post");
        let resp=  await sendMail("mealPlanBuy",{"email":sharedState.email});
        console.log("resp buddy",resp);
       
}
// foodApp/controller/bookingController.js




