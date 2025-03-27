const listing=require('./models/schema');
const review=require('./models/review_schema');
const {listingSchema,reviewschema}=require('./schema.js');
const expressError=require('./utils/expressError.js');


module.exports.validationListing = (req,res,next)=>{
    const result=listingSchema.validate(req.body);
    if(result.error){
        let errmsg=result.error.details.map((el)=>el.message).join(",");
        throw new expressError(400,result.error.message);
    }
    else next();
}


module.exports.reviewvalidation = (req,res,next)=>{
    console.log(req.body);
    const result=reviewschema.validate(req.body);
    if(result.error){
        let errmsg=result.error.details.map((el)=>el.message).join(",");
        throw new expressError(400,result.error.message);
    }
    else next();
}


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