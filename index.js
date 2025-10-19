if(process.env.NODE_EVN!=="production"){
    require("dotenv").config();
}

const express=require('express');
const app=express();
const methodOverride=require('method-override');
const connection=require('./models/connection.js');
const ejsmate=require('ejs-mate')
const expressError=require('./utils/expressError.js');
const listingRouter=require('./routes/listings.js')
const reviewRouter=require('./routes/reviews.js');
const userRouter=require('./routes/user.js');
const bookingRouter=require('./routes/booking.js');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const passport = require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user_schema.js');
const { mongo } = require("mongoose");
let mongo_url=process.env.mongo_atlas_url;


const port=3000;
connection();
//all used method are written here
app.use(express.static('public'));
app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// we use this(store) when we render the site online =>

const store=MongoStore.create({
    mongoUrl:mongo_url,
    crypto:{
        secret:process.env.MYSECRET,
    },
    touchAfter:24*60*60 //in seconds
});
store.on("error",()=>{
    console.log("Error in mongo session store ",err);
})

const sessionOptions={
    store:store,
    secret:process.env.MYSECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        // secure: false,
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httponly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());

//user authentication basic code
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
})

//root route
app.get('/',(req,res)=>{
    res.redirect('/listings');
})

//routes
app.use('/listings',listingRouter);
app.use('/listings/:id/review',reviewRouter);
app.use('/',userRouter);
app.use('/booking',bookingRouter);


//Rest routes
app.all('*',(req,res,next)=>{
    // printing the error and route where it occurred
    console.log(`failed , page not found at ${req.originalUrl}`);
    console.log("failed , page not found");
    next(new expressError(404,'page not found'));
})

// handling error by custom middleware
app.use((err,req,res,next)=>{
   let {statusCode=500,message='Something went wrong'}=err;
   res.render('listings/error.ejs',{message});
   console.log("failed , some error occurred");
   console.log(err);
})

// checking port
app.listen(port,()=>{
    console.log("app is listening");
})