const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser()); 
const cors = require('cors');
app.use(cors());
app.use(express.static('public/build'));
const PORT = process.env.PORT || 5000;

const userRouter=require("./Routers/userRouter");
const planRouter=require("./Routers/planRouter");
const reviewRouter=require("./Routers/reviewRouter");
const   bookingRouter=require("./Routers/bookingRouter");

app.use('/user',userRouter);

const planModel = require("./models/planModel");
app.use("/plan",planRouter);
app.use("/review",reviewRouter);
app.use("/booking",bookingRouter);
app.listen(PORT,()=>console.log("server is listening at port 5000"))
