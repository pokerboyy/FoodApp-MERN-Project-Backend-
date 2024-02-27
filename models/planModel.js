const mongoose=require('mongoose');
const { db_link } = require('../secrets');

mongoose.connect(db_link).then(function(db){
    console.log('plan db connected')
}).catch(function(err){
    console.log(err);
})
const planSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,"Your plan length is more than 20 characters"]
    },
    duration:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.duration<100;
        },'discount cannot be 100']
    },
    ratingsAverage:{
        type:Number,
        
    },
    nor:{
        type:Number,
        default:0
    }
})


const planModel=mongoose.model('planModel',planSchema);

// (
//     async function createPlan(){
//         let plan={
//             name:"Plan 3",
//             duration:3,
//             price:'500',
//             ratingsAverage:3.9,
//             discount:150
//         }
//         let data=await planModel.create(plan);
//         console.log(data);
//     }
// )();
module.exports=planModel;