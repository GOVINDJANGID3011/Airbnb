const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const User=require('../models/user_schema.js');
const passport = require('passport');
const { saveRedirectUrl, isLogged } = require('../middleware.js');

const usercontroller = require('../controller/usercontroller.js');

const {storage}=require('../cloudconfig.js');
const multer=require('multer');
const upload=multer({storage});

//for signup
router.route('/signin')
        .get(usercontroller.signup_form)
        .post(wrapAsync(usercontroller.signup));


//for login
router.route('/login')
        .get(usercontroller.login_form)
        .post(saveRedirectUrl,
        passport.authenticate('local',{failureRedirect:'/login',failureFlash:true,}),
        wrapAsync(usercontroller.login));

//for logout
router.route('/logout')
        .get(usercontroller.logout);

//for edit user
router.get(
        '/edit',isLogged,(req,res)=>{
        res.render('./users/edit_user');
});

router.post('/edit',isLogged,upload.single('profilePic'),async(req,res)=>{
        // console.log(req.file);
        // console.log(res.locals.currUser);
        // console.log(currUser);
        if(req.file){
                let url=req.file.path;
                let newuser=await User.findById(res.locals.currUser._id);
                newuser.profile_pic=url
                await newuser.save();
        }
        res.redirect("/listings");
});
module.exports=router;