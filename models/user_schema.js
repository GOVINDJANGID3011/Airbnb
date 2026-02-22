const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const profile_pic_default ="../assets/default_profile_pic.png";


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email address'
        ],
        index: true
    },
    profile_pic: {
      type: String,
      default:'/images/default_profile_pic.png'
    },

    host_bookings: [ // bookings on user's listings (they are the host)
        {
            type: mongoose.Schema.ObjectId,
            ref: "booking"
        }
    ],
    guest_bookings: [ // bookings the user made (they are the guest)
        {
            type: mongoose.Schema.ObjectId,
            ref: "booking"
        }
    ],
});


// here plugin the passport local mongoose to userSchema for authentication purpose 
// it will add username , hash and salt field(keys) to userSchema automatically 
// it only add hash and salt fields not bcrypt password field
//  bcrypt is handled by register method of passport local mongoose which we used in signup controller
userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);
