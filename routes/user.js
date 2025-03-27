const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const User=require('../models/user_schema.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const usercontroller = require('../controller/usercontroller.js');


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


module.exports=router;