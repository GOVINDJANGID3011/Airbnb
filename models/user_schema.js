const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=mongoose.Schema({
    email:{
        type:String,
        require:true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports=new mongoose.model("User",userSchema);