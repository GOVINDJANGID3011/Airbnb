const listing=require('./models/schema');
const review=require('./models/review_schema');
const {listingValidationSchema,reviewValidationSchema,bookingValidationSchema}=require('./schema.js');
const expressError=require('./utils/expressError.js');


module.exports.listingvalidation = (req,res,next)=>{
    const result=listingValidationSchema.validate(req.body);
    if(result.error){
        let errmsg=result.error.details.map((el)=>el.message).join(",");
        throw new expressError(400,result.error.message);
    }
    else next();
}


module.exports.reviewvalidation = (req,res,next)=>{
    console.log(req.body);
    const result=reviewValidationSchema.validate(req.body);
    if(result.error){
        let errmsg=result.error.details.map((el)=>el.message).join(",");
        throw new expressError(400,result.error.message);
    }
    else next();
}


module.exports.bookingvalidation = (req, res, next) => {
    console.log(req.body);

    const { error } = bookingValidationSchema.validate(req.body, { abortEarly: false }); 
    // abortEarly:false → collect ALL errors, not just first

    if (error) {
        // collect all validation error messages
        let errmsg = error.details.map(el => el.message).join("  AND  ");

        // flash error message
        req.flash("error", errmsg);

        // ✅ safer redirect instead of 'back'
        // req.get("Referrer") → reads the HTTP Referrer header (URL of the page the user came from).
        return res.redirect(req.get("Referrer") || "/");
    }

    next();
};

module.exports.isLogged=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash('success',"Please Login");
        res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    else {
        res.locals.redirectUrl='/listings';
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;

    let list= await listing.findById(id);
    if(!list.owner._id.equals(res.locals.currUser._id)){
        req.flash("success","You are not owner of this listing");
        return res.redirect(`/listings/view/${id}`);
    }
    next();
}


module.exports.isreviewAuthor=async(req,res,next)=>{
    let {id,review_id}=req.params;
    let new_review= await review.findById(review_id);
    console.log(new_review.author);
    console.log(res.locals.currUser._id);
    if(!new_review.author.equals(res.locals.currUser._id)){
        req.flash("success","You are not owner of this review");
        return res.redirect(`/listings/view/${id}`);
    }
    next();
}

module.exports.uservarification=async(req,res,next)=>{
    try {
        const { username } = req.body;
        const user = await require('./models/user_schema').findOne({ username: username });
        if (user && !user.isVerified) {
            req.flash('error', 'Please verify your email before logging in.');
            return res.redirect('/login');
        }
        next();
    } catch (error) {
        next(error);
    }
}