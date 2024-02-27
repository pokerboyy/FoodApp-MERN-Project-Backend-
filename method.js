const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
let user=[
{
    id:1,
    name:"Abhishek",
    age:100
},
{
id:2,
name:"Rajat",
age:10
},
{
id:3,
name:"Sunjyot",
age:50
}
];
const userRouter=express.Router();
app.use('/user',userRouter);
userRouter
.route("/")
.get(middleware1,getUser,middleware2)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)
userRouter.route("/:name").get(getUserById);    

function middleware1(req,res,next)
{
    console.log("middleware 1 called");
    next();
}
function middleware2(req,res)
{
    console.log("middleware 2 called");
    // if you did not use res.send or res.json in previous function other wise error will come
    res.json({msg:"user returned"})
}
function getUser(req,res,next){
    console.log(req.query);
    let { name, age } = req.query;
     next();
    
    // res.send(user);
}
function postUser(req,res){
    console.log("hello");
    // console.log(req)
    console.log(req.body.Name)
        user.push(req.body);
        res.json({
            message:"Data recieved successfully",
            user:req.body   
        });
}
function updateUser(req,res){
    console.log(req.body);
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated)
    {
        user[key]=dataToBeUpdated[key]
    }
res.json(({
    message:"data updated succesfully"      
}))
}
function deleteUser(req,res){
    user={},
    res.json({
            msg:"user has been deleted"
    });
}
function getUserById(req,res){
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    // res.json({ msg: "user id is ", "obj": req.params });
  }
// function getUserById(req,res){
//     console.log(req.params.id);
//     // res.send(req.params.id)
//   res.json({msg:"user id is ","obj":req.params});
// }

app.listen(5000);