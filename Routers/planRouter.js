const express=require('express')
const {protectRoute,isAuthorized}=require('../helper')
const planRouter=express.Router();


const { getAllPlans,getPlan,createPlan ,updatePlan,deletePlan,top3plans} = require('../controller/planController');
planRouter
.route('/all')
.get(getAllPlans)

 planRouter
 .route('/top3')
 .get(top3plans)    

planRouter.use(protectRoute)
planRouter
.route('/single/:id')
.get(getPlan)


planRouter.use(isAuthorized(['admin','restaurantowner']));

planRouter
.route('/crud')
.post(createPlan)

planRouter  
.route('/crud/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports=planRouter;