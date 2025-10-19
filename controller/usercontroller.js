const User=require('../models/user_schema.js');

module.exports.signup_form=(req,res)=>{
    res.render('./users/signin.ejs');
    console.log("successfully showing signup form");
}

module.exports.signup=async(req,res)=>{
    try {
        let {username,email,password}=req.body;
        let newuser=new User({email,username});
        let registered_user=await User.register(newuser,password);
        req.login(registered_user,(err)=>{
            if(err)next(err);
            req.flash('success',"Welcome to wanderlust");
            res.redirect('/listings');
        })
        console.log("successfully signed up");
    } catch (error) {
        req.flash('success',"This Username already exist ! Please try with other username");
        res.redirect('/signin');
    }
}

module.exports.login_form=(req,res)=>{
    res.render('./users/login.ejs');
    console.log("successfully showing login form");
}

module.exports.login=async(req,res)=>{
    req.flash('success',"Welcome to wanderlust");
    res.redirect(res.locals.redirectUrl);
    console.log("successfully logged in");
}

module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err)next(err);
        req.flash('success',"You are logged out");
        res.redirect('/listings');
        console.log("successfully logged out");
    })
}