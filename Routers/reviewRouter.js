const express=require("express");
const reviewRouter=express.Router();
const {isAuthorized,protectRoute}=require("../helper");
const {getAllReviews,top3reviews,getPlanReview,createReview,updateReview,deleteReview}=require("../controller/reviewController");

reviewRouter
.route("/all")
.get(getAllReviews)

reviewRouter
.route("/top3")
.get(top3reviews)


reviewRouter.use(protectRoute)

reviewRouter
.route("/crud/:plan")
.post(createReview)
.patch(updateReview)
.delete(deleteReview)


reviewRouter
.route("/:id")
.get(getPlanReview)

module.exports=reviewRouter