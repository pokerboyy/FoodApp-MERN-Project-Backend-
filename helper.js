var jwt=require("jsonwebtoken");
const userModel=require("./models/userModel")
const {JWT_KEY}=require("./secrets")
module.exports.protectRoute= async function (req,res,next)
{
    let token;
    if(req.cookies.login){
        token=req.cookies.login
        let payloadObj=jwt.verify(token,JWT_KEY);
        const user=await userModel.findById(payloadObj.payload);
        req.id=user.id;
        req.role=user.role; 
        let isVerified=jwt.verify(token,JWT_KEY);
        if(payloadObj){
            console.log("jwt verified success")
            next();
        }
        else
        {
            req.json({
                msg:'user not verified'
            })
        }
    }
    // next();
    else
    {
        return res.json({
            msg:"operation not allowed"
        });
    }
}

module.exports.isAuthorized=function(roles)
{
    
    return  function (req,res,next)
    {
        console.log("isAuthorized2")
        console.log(req.role)
        let role=req.role;
        if(roles.includes(role))
        {
            console.log("verified")
            next();
        }else{
        res.status(401).json({
            msg:"role invalid",
        })
    }
    }
}

// "name":"Timon",
// "email":"timon@gmail.com",
// "password":"123456789",
// "confirmPasswortd":"1234567890"