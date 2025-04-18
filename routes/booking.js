const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const bookingcontroller=require('../controller/bookingcontroller.js')
const { isLogged, bookingvalidation} = require('../middleware.js');

router.route('/:id')
        .get(isLogged,wrapAsync(bookingcontroller.bookingform))  //form to book a listing
        .post(isLogged,bookingvalidation,wrapAsync(bookingcontroller.addbooking)); //add a booking

router.route('/trips/:id')
        .get(isLogged,wrapAsync(bookingcontroller.showtrips)) //get all trips of a user
        // .delete(isLogged,wrapAsync(bookingcontroller.deletebooking)); //delete a booking

router.route('/bookings/:id')
        .get(isLogged,wrapAsync(bookingcontroller.showbookings)) //get all trips of a user
        // .delete(isLogged,wrapAsync(bookingcontroller.deletebooking)); //delete a booking
module.exports=router;