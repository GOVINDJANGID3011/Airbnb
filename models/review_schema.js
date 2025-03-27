const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    comment:String,
    rating:{
       type: Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
})

module.exports=new mongoose.model("review",reviewSchema);