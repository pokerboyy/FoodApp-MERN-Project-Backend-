const express = require("express");
const userRouter = express.Router();
// const userModel=require("../models/userModel");
const {
    getUser,postUser,updateUser,deleteUser,getUserById,setCookies,getCookies,allUser
}=require("../controller/userController");
const {protectRoute,isAuthorized}=require("../helper");
const {signup,login, resetpassword,forgetpassword,logout}=require("../controller/authController");

userRouter
.route("/:id")
.patch(updateUser)
.delete(deleteUser)
userRouter
.route("/login")
.post(login)

userRouter
  .route("/signup")
  .post(signup);

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token").post(resetpassword);

userRouter
.route("/logout")
.get(logout)
userRouter.use(protectRoute);
userRouter.route('/profile')
.get(getUser)

userRouter.use(isAuthorized(["admin"]))
userRouter.route('/')
.get(allUser)





module.exports=userRouter;  
