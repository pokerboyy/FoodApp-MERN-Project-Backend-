var jwt=require("jsonwebtoken");
const userModel=require("../models/userModel")
const {JWT_KEY}=require("../secrets");

// const {use }=require("../Routers/userRouter");
const { sendMail } = require("../utility/nodemailer");
const sharedState = require("./idx");
console.log("1234",JWT_KEY)


module.exports.signup=async function(req,res){
    console.log("inside signup")
    try{
        let data=req.body;
        console.log("hello1");
        let user=await userModel.create(data);
        console.log("hello2");
        if(user)
        {
            await sendMail("signup",user)
            res.json({
                msg:"user signed up",
                err:"no error",
                user,
            })

        }else
        {
            res.json({
                msg:"user could not be signed up",
                err:"no error",
            })
        }
    }catch(err)
    {
        res.json({
            err:err.message
        });
    }
}
module.exports.login=async function(req,res)
{
    try{
        let {email,password}=req.body;
        sharedState.email = email;
        let user= await userModel.findOne({email:email});
        if(user)
        {

            if(password==user.password)
            {
                let uid=user["_id"];
                var token=jwt.sign({payload:uid},JWT_KEY);
                res.cookie("login",token);
                res.json({
                    msg:"user logged in",
                    user,
                })
            }else
            {
                res.json({
                    msg:"wrong credential",
                });
            }
        }else{
res.json({
    msg:"user not found"
})
        }
        }catch(err)
        {
            res.json({
                msg:err.message
            })
        }
    }

module.exports.forgetpassword=async function (req,res){
    try{
        console.log("inside forget password")
        let {email}=req.body;
        const user=await userModel.findOne({email:email});
        console.log("user"+user);
        if(user)
        {
            const resetToken=await user.createResetToken();
            console.log("resetToken",resetToken)
            let resetPasswordLink=`${req.protocol}://localhost:3000/user/resetpassword/${resetToken}`;
            // let resetPasswordLink=`${req.protocol}://64c963c36883fd0c3a97b275--soft-pixie-e3d804.netlify.app/user/resetpassword/${resetToken}`;
            // https://64c963c36883fd0c3a97b275--soft-pixie-e3d804.netlify.app/
            await sendMail("forgetpassword",{email,resetPasswordLink});
            
      res.json({
        msg:"email sent successfully"
      })
        }else
        {
            res.json({
                msg:"user not found"
            })
        }
    }catch(err)
    // http://localhost:3000/forgetPassword
{
res.status(500).json({
    msg:err.message
})
}
}


module.exports.resetpassword=async function (req,res){
    try{
        console.log("inside reset password")
        console.log("token-->",req)
        console.log("token-->",req.params)
        console.log("token-->",req.params.token)
        const token=req.params.token.trim();
        console.log("token-->",token)
        let {password,confirmPassword}=req.body;
        const user=await userModel.findOne({'resetToken':token});
        if(user)
        {
            
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.json({
                msg:"password changed successfully"
            })
        }else
        {
            res.json({
                msg:"user not found"
            })
        }
    }catch(err)
    {
        res.json({
            msg:err.message
        })
    }
}
module.exports.logout=function (req,res)
{
    res.cookie('login','',{maxAge:1});
    res.json({
        msg:"user logged out successfully"
    })
}
