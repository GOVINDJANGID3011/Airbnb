const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
// const expressError=require('../utils/expressError.js');
// const listing=require('../models/schema.js');
// const review=require('../models/review_schema.js');
const { isLogged,listingvalidation, isOwner } = require('../middleware.js');
// const User=require('../models/user_schema.js');

const listingcontroller = require('../controller/listingcontroller.js');

const {storage}=require('../cloudconfig.js');
const multer=require('multer');
const upload=multer({storage:storage,limits: { files: 10 }});

// listing routes

router.route('/')
        .get(wrapAsync(listingcontroller.index));       // view all listing route


router.route('/view/:id')
        .get(wrapAsync(listingcontroller.view_listing));        // view a listing route


router.route('/new_listing')
        .get(isLogged,wrapAsync(listingcontroller.new_listing_form));       // Add listing route

router.route('/add')   
        .post(upload.array('images[]',10),listingvalidation,wrapAsync(listingcontroller.add_new_listing));


router.route('/edit/:id')
        .get(isLogged,isOwner,wrapAsync(listingcontroller.edit_listing_form))       // Edit route
        .put(upload.array('images[]',10),
        listingvalidation,isOwner,
        wrapAsync(listingcontroller.update_listing));      //update route



router.route('/delete/:id')
        .delete(isLogged,isOwner,wrapAsync(listingcontroller.delete_listing));      // Delete route

module.exports=router;

