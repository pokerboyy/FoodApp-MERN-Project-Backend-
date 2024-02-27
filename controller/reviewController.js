const reviewRouter = require("../Routers/reviewRouter");
const planModel=require("../models/planModel");
const reviewModel=require("../models/reviewModel");

module.exports.getAllReviews=async function(req,res){
    try{
const reviews=await reviewModel.find();
if(reviews)
{
    return res.json({
        msg:"review retrieved",
        reviews
    })
}
    }catch(err)
    {
 res.json({
    msg:err.message
 })
    }
}

module.exports.top3reviews=async function(req,res){
    try{
const top3=await reviewModel.find().sort({rating:-1}).limit(3);
if(top3)
{
        return res.json({
            msg:"reviews retrieved",    
            top3,
        })
}else
{
    return res.json({
        msg:"no reviews found",
    })
}
    }catch(err)
    {
        res.json({
            msg:err.message
        })
    }
}

module.exports.getPlanReview=async function(req,res){
    try{

        const planId=req.params.id;
        let reviews=await reviewModel.find();
        reviews=reviews.filter(review=>review.plan["_id"]==planId);
        if(reviews)
        {
            return res.json({
                msg:"reviews retrieved",
                reviews
            })
        }else
        {
            return res.json({
                msg:"reviews not found",
            })
        }
    }catch(err)
    {
        res.json({
            msg:err.message
        })
    }
}



module.exports.createReview=async function(req,res){
    try{
        // const review=req.body;
        // console.log("review is ",review);
//         const typeOfMyValue = typeof planId;
// console.log(typeOfMyValue); // Output: "number"
// console.log(planId)
const planId = req.params.plan;
const trimmedPlanId = planId.trim(); // Removes the newline character and any leading/trailing whitespace

const plan = await planModel.findById(trimmedPlanId);
console.log(JSON.stringify(plan))
  plan.ratingsAverage =
      (plan.ratingsAverage * plan.nor + req.body.rating) / (plan.nor + 1);
    plan.nor += 1;
    await plan.save();
const review=req.body;
// console.log("hello1");
const postReview=await reviewModel.create(review);
// console.log("hello2");
    await postReview.save()
    // console.log("hello3");
    return res.json({
        msg:"review posted",
        postReview
    }) 
    }catch(err)
    {
        res.status(500).json(
            {
                msg:err.message
            }
        )
    }
}

module.exports.updateReview=async function(req,res){
    try{
        console.log("updating");
let planId=req.params.plan;
let id=req.body.id;
let dataToBeUpdated =req.body;
let keys=[];
for(let key in dataToBeUpdated)
{
    if(key==id) continue
    keys.push(key);
}
let review=await reviewModel.findById(id);
for(let i=0;i<keys.length;i++)
{
    review[keys[i]]=dataToBeUpdated[keys[i]];
}
await review.save();
return res.json({
    message:"review updated",
    review
})
    }catch(err)
    {
        return res.json({
            msg:err.message
        })
    }
}

module.exports.deleteReview=async function(req,res){
    console.log("deleting")
    try{
let planId=req.params.plan;
let id=req.params.plan;
console.log("delete id is ",id.trim());
let review=await reviewModel.findByIdAndDelete(id);
res.json({
    message:"review deleted",
    review
})
    }
    catch(err)
    {
return res.json({
    msg:err.message
})
    }
}

// {
//     "msg": "Cast to ObjectId failed for value \"64c61d34f3da6a6e822d6e67\\n\" (type string) at path \"_id\" for model \"planModel\""
// }