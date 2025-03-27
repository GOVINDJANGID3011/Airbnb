const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const listing=require('../models/schema.js');
const review=require('../models/review_schema.js');
const {reviewvalidation,isLogged,isreviewAuthor}=require('../middleware.js')

const reviewcontroller = require('../controller/reviewcontroller.js');



//reviews
router.route('/add')
        .post(isLogged,reviewvalidation,wrapAsync(reviewcontroller.add_review));    //Add review


router.route("/delete/:review_id")
        .delete(isLogged,isreviewAuthor,wrapAsync(reviewcontroller.destroy_review));    // delete review route

module.exports=router;