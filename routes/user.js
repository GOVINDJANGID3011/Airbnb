const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const User=require('../models/user_schema.js');
const passport = require('passport');
const { saveRedirectUrl, isLogged } = require('../middleware.js');
const { uservarification } = require('../middleware.js');

const usercontroller = require('../controller/usercontroller.js');

const {storage}=require('../cloudconfig.js');
const multer=require('multer');
const upload=multer({storage});

//for signup
//here we did not used wrapAsync because we already used try catch block in signup controller function 
router.route('/signin')
        .get(usercontroller.signup_form)
        .post(wrapAsync(usercontroller.signup));

// for email verification by token and otp
//here we did not used wrapAsync because we already used try catch block in verify_email controller function
router.route('/verify-email')
        .get(usercontroller.verify_email_by_token)
        .post(usercontroller.verify_email_by_otp);
        

//for login
router.route('/login')
        .get(usercontroller.login_form)
        // here authenticate method of passport is used to verify user login credentials(that is username and password already exist or not in database , if exist then allow to login else redirect to login page again)
        .post(saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true,}),wrapAsync(usercontroller.login));


//for logout
router.route('/logout')
        .get(usercontroller.logout);


//for edit user
router.get(
        '/edit',isLogged,(req,res)=>{
        res.render('./users/edit_user');
});

router.post('/edit',isLogged,upload.single('profilePic'),async(req,res)=>{

        if(req.file){
                let url=req.file.path;
                let newuser=await User.findById(res.locals.currUser._id);
                newuser.profile_pic=url
                await newuser.save();
        }
        res.redirect("/listings");
});
module.exports=router;