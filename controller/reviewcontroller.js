const listing=require('../models/schema.js');
const review=require('../models/review_schema.js');
// const expressError=require('../utils/expressError.js');


module.exports.add_review=async(req,res)=>{
    let newreview=new review(req.body.review);
    newreview.author=req.user._id;
    let newlisting=await listing.findById(req.params.id);
    await newlisting.reviews.push(newreview);
    console.log(newreview);
    await newreview.save();
    await newlisting.save();
    req.flash('success',"New Review Created");
    res.redirect(`/listings/view/${req.params.id}`)
}

module.exports.destroy_review=async(req,res)=>{
    let {id,review_id}=req.params;
    await listing.findByIdAndUpdate(id,{$pull : {reviews:review_id}});
    await review.findByIdAndDelete(review_id);
    req.flash('success',"Review Deleted");
    res.redirect(`/listings/view/${id}`);
}