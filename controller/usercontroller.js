const User=require('../models/user_schema.js');
const mailSender=require('../utils/mailSender.js');
const jwt=require('jsonwebtoken');


module.exports.signup_form=(req,res)=>{
    res.render('./users/signin.ejs');
    console.log("successfully showing signup form");
}

module.exports.signup=async(req,res)=>{
    try {
        //get data from form
        let {username,email,password}=req.body;

        // validate user input
        if(!username || !email || !password){
            req.flash('error',"All fields are required");
            return res.redirect('/signin');
        }

        // check if user already exists
        const existingUser=await User.findOne({$or:[{username:username},{email:email}]});
        if(existingUser){
            req.flash('error',"User already exists with this username or email");
            return  res.redirect('/signin');
        }

        // create new user without password
        let newuser=new User({email,username});

        // register the user with password and register is a inbuilt method of passport local mongoose
        // it will hash the password means bcrypt and save the user
        let registered_user=await User.register(newuser,password);

        // Generate a verification token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "5m" });

        //send mail to user after successful signup
        await mailSender(email, token,"this a verification mail from wanderlust","welcome to wanderlust! please verify your email");
        
        console.log("Registration successful! Please check your email to verify your account.");
        req.flash('success',`Registration successful! Please check your email to verify your account.`);
        res.redirect('/listings');

    } catch (error) {

        req.flash('error',"Something went wrong during registration");
        res.redirect('/signin');
    
    }
}

module.exports.verify_email = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // ✅ Update verification status using async/await (no callbacks)
    const user = await User.findOneAndUpdate(
      { email: email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      req.flash('error', 'User not found.');
      return res.redirect('/signup');
    }

    // ✅ Automatically log in the user after verification
    req.login(user, (err) => {
      if (err) {
        console.error('Login error after verification:', err);
        req.flash('error', 'Login failed after verification.');
        return res.redirect('/signin');
      }
      req.flash('success', '✅ Email verified and logged in successfully!');
      res.redirect('/listings');
    });

  } catch (error) {
    console.error('❌ Error verifying email:', error);
    req.flash('error', 'Invalid or expired verification link.');
    res.redirect('/signin');
  }
};

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

    // logout method of passport to logout user
    req.logOut((err)=>{
        if(err)next(err);
        req.flash('success',"You are logged out");
        res.redirect('/listings');
        console.log("successfully logged out");
    })
}