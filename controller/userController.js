const userModel=require('../models/userModel');
module.exports.getUser=async function (req,res){
    console.log(req.query);
    // let { name, age } = req.query;
    let allUsers=await userModel.find();
    // let allUsers=await userModel.findOne({name:"Monish"});
    res.json({msg:"users retrieved",allUsers});
    // res.send(user);
}

// module.exports.postUser=function(req,res){
//  console.log(req.body.name);
//  //then i can put this in db
//  userModel.push(req.body);
//  res.json({ 
// message:"Dara created succesfully",
// user:req.body,
//  });
// }
module.exports.updateUser=async function(req,res){
    console.log(req.body);
    let dataToBeUpdated=req.body;
    let id=req.params.id;
    let user=await userModel.findById(id);
    // let dataToBeUpdated=req.body;
    try{
        if(user)
        {
            const keys=[];
            for(let key in dataToBeUpdated)
            {
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++)
            {
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
            const updatedData=await user.save();
            res.json({
                message:"data updated succesfully",
                updatedData,
            });
        }else
        {
res.json({
    message:"user not found",
})
        }
    }
  catch(err)
  {
    res.json({
        message:err.message
    })
  }

}

module.exports.deleteUser=async function(req,res){
    // user={},
    try{
        let id=req.params.id;
    // console.log("delete user")
    // let doc=await userModel.deleteOne({email:"abc@gmail.com"});
//     let doc=await userModel.findOneAndRemove({email:"abc@gmail.com"});
// console.log("called");
//     console.log(doc);
    let user=await userModel.findByIdAndDelete(id);

    // let del =await user.remove();
    // console.log(del)
    res.json({
        msg:"user deleted",
        user
    });
}catch(err)
{
    res.json({
        msg:err.message
    })
}
 
}

module.exports.allUser=async function(req,res){
try{
    let allUsers=await userModel.find();
    res.json(
    {
        msg:"user id is ",
        allUsers
    }
    );

}catch(err)
{
    res.json({
        msg:err.message
    })
}
  }

 module.exports.setCookies=function(req,res)
  {
    //   console.log("setting cookies")
      res.cookie('isLoggedIn',false,{maxAge:10000,secure:true});
      res.cookie('password',123455678,{secure:true});
      res.send('cookies has been set');
  }
  module.exports.getCookies=function(req,res)
  {
      // console.log(req);
      console.log("getting cookies")
      let cookies=req.cookies;
      console.log(cookies);
      res.send('cookies received');
  }