const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookinguser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookedlisting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true,
    },
    bookingAt: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true,
        default:0,
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed',
    },
});

module.exports = mongoose.model("booking", bookingSchema);
