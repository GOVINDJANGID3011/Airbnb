const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: "https://i.pinimg.com/736x/71/e0/19/71e019156ea27ecd99e0fd6a91804054.jpg",
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

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);
