const User=require('../models/user_schema.js');
const pendingUser=require('../models/pendingUser.js');
const mailSender=require('../utils/mailSender.js');
const jwt=require('jsonwebtoken');


module.exports.signup_form=(req,res)=>{
    res.render('./users/signin.ejs');
    console.log("successfully showing signup form");
}

module.exports.signup=async(req,res)=>{
    try {
        //get data from form and validate
        let {username,email,password}=req.body;

        // validate user input
        if(!username || !email || !password){
            req.flash('error',"All fields are required");
            return res.redirect('/signin');
        }

        // validate username length
        if(username.length<3 || username.length>20){
            req.flash('error',"Username must be between 3 and 20 characters");
            return res.redirect('/signin');
        }

        // validate password length and strength(it must contain at least one uppercase letter, one lowercase letter, one digit, and one special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            req.flash('error',"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
            return res.redirect('/signin');
        }

        // validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            req.flash('error',"Invalid email format");
            return res.redirect('/signin');
        }

        // check if user already exists
        const existingUser=await User.findOne({$or:[{username:username},{email:email}]});
        if(existingUser){
            req.flash('error',"User already exists with this username or email");
            return  res.redirect('/signin');
        }

        //if pending user already exists, remove it
        const existingPendingUser=await pendingUser.findOne({email:email});
        if(existingPendingUser){
            await pendingUser.deleteOne({email:email});
        }

        // Generate a verification token and otp which expire in 5 minutes
        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '5m'});
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

        // Create a new pending user
        const newPendingUser = new pendingUser({
            email,
            username,
            password,
            otp,
            otp_expiry: Date.now() + 5 * 60 * 1000 // OTP expiry time set to 5 minutes from now
        });
        await newPendingUser.save();

        //send mail to user after successful signup
        await mailSender(email, token, otp);

        //flash message for login page
        console.log("Verification email sent to", email);
        // flash message only after redirecting to any page but here we are rendering otp verification page directly after signup so we are passing message in render method which is another way to show flash message without redirecting
        res.render('./users/otp_verification.ejs', { email , success:"Please verify your email using the link or OTP sent to your email address."} ); // Render OTP verification page with email
    } catch (error) {
        console.log("❌ Error during signup:", error);
        req.flash('error',"Something went wrong during signup. Please try again.");
        res.redirect('/signin');
    }
}

module.exports.verify_email_by_token = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    //check if user exists in user collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email is already verified. Please log in.');
      return res.redirect('/login');
    }

    // find the pending user by email
    const pendingUserData = await pendingUser.findOne({ email });
    if (!pendingUserData) {
      req.flash('error', 'Invalid or expired verification link.');
      return res.redirect('/signin');
    }

    // create new user in main user collection
    const { username, password } = pendingUserData;
    const user = new User({ username, email });
    await User.register(user, password); // passport-local-mongoose method to register user with hashed password

    // delete pending user after successful verification
    await pendingUser.deleteOne({ email });

    // Flash success message for signin page
    req.flash('success', '✅ Email verified successfully!');

    // ✅ Automatically log in the user after verification
    req.login(user, (err) => {
      if (err) {
        console.error('Login error after verification:', err);
        req.flash('error', 'Login failed after verification.');
        return res.redirect('/signin');
      }
      req.flash('success', 'You are logged in successfully!');
      res.redirect('/listings');
    });

  } catch (error) {
    console.error('❌ Error verifying email:', error);
    req.flash('error', 'Invalid or expired verification link.');
    res.redirect('/signin');
  }
};

module.exports.verify_email_by_otp=async(req,res)=>{
    try {
        // get otp and email from request body
        const { otp,email } = req.body;

        // check if user already exists in user collection
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            req.flash('error', 'Email is already verified. Please log in.');
            return res.redirect('/login');
        }


        // find the pending user by otp and email and checking otp expiry
        const pendingUserData = await pendingUser.findOne({
            email: email,
            otp: otp,
            otp_expiry: { $gt: Date.now() } // check if otp is not expired
        });

        if (!pendingUserData) {
            // if otp is invalid or expired
            // flash message only after redirecting to any page but here we are rendering otp verification page directly after signup so we are passing message in render method which is another way to show flash message without redirecting
            return res.render('./users/otp_verification.ejs', { email: Email , error:"Invalid or expired OTP. Please try again."} );
        }

        const {username, password } = pendingUserData;

        // create new user in main user collection
        const user = new User({ username, email });
        await User.register(user, password); // passport-local-mongoose method to register user with hashed password
        // delete pending user after successful verification
        await pendingUser.deleteOne({ email });
        // Flash success message for signin page
        req.flash('success', '✅ Email verified successfully!');

        // ✅ Automatically log in the user after verification
        req.login(user, (err) => {
            if (err) {
                console.error('Login error after OTP verification:', err);
                req.flash('error', 'Login failed after OTP verification.');
                return res.redirect('/signin');
            }
            req.flash('success', 'You are logged in successfully!');
            res.redirect('/listings');
        });

    } catch (error) {
        console.error('❌ Error verifying OTP:', error);
        req.flash('error', 'Something went wrong during OTP verification.');
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