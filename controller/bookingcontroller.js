const listing=require('../models/schema');
const booking=require('../models/bookingSchema')
const User=require('../models/user_schema.js');

module.exports.bookingform=async (req,res)=>{
    let {id}=req.params;
    let newlisting=await listing.findById(id);
    res.render('./bookings/booking_form.ejs',{newlisting});
    console.log("successfully rendering booking form");
}

module.exports.addbooking=async (req,res)=>{
  console.log("entered add booking");
    //validating the booking form
    //we can use validation here for this but for now we are not using it , we are using joi validation in the middleware.js file
    let {id}=req.params;
    let newlisting=await listing.findById(id);
    let newbooking=await new booking(req.body);
    newbooking.owneruser=newlisting.owner;
    newbooking.bookedlisting=newlisting._id;
    newbooking.bookinguser=res.locals.currUser._id;

    //checking if the user is trying to book his own listing
    if(newbooking.owneruser.equals(newbooking.bookinguser)){
        req.flash('error',"You cannot book your own listing");
        return res.redirect(`/listings/view/${id}`);
    }

    //saving the booking
    await newbooking.save();
    req.flash('success',"Successfully booked");

    //updating the booking for user who booked 
    let booking_user=await User.findById(res.locals.currUser._id);
    await booking_user.guest_bookings.push(newbooking);
    await booking_user.save();
    
    //updating the booking for owner of the listing
    let owner_user=await User.findById(newlisting.owner);
    await owner_user.host_bookings.push(newbooking);
    await owner_user.save();

    //redirecting to the listing page
    res.redirect(`/listings/view/${id}`);
    console.log("successfully added booking");
}


module.exports.showtrips=async (req,res)=>{
    let {id}=req.params;    
    //finding the user who booked the listing and populating the guest_bookings field
    //and also populating the bookedlisting and owneruser fields of the booking schema
    let newuser = await User.findById(id).populate({
        path: 'guest_bookings',
        populate: [
          { path: 'bookedlisting' },
          { path: 'owneruser' },
          {path:  'bookinguser'}
        ],
        options: { sort: { bookingAt: -1 } }
      });
    //rendering the show trips page and passing the user object to it
    res.render('./bookings/show_trips.ejs',{user:newuser});
    console.log("successfully showing all trips page");
}


module.exports.showbookings=async (req,res)=>{
  let {id}=req.params;
  //findind the user whose listingis booked and populating the host_bookings field
  let newuser = await User.findById(id).populate({
      path: 'host_bookings',
      populate: [
        { path: 'bookedlisting' },
        { path: 'owneruser' },
        {path:  'bookinguser'}
      ],
      options: { sort: { bookingAt: -1 }}
    });
  res.render('./bookings/show_bookings.ejs',{user:newuser});
  console.log("successfully showing all bookings page");
}