const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must be at least 3 characters"],
        maxlength: [50, "Full name must not exceed 50 characters"],
        match: [/^[a-zA-Z\s]+$/, "Full name must only contain letters and spaces"]
    },
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner user is required"],
    },
    bookinguser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Booking user is required"],
        validate: {
            validator: function(v) {
                return v.toString() !== this.owneruser.toString();
            },
            message: "Booking user cannot be the same as owner user"
        }
    },
    bookedlisting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        required: [true, "Booked listing is required"],
    },
    phone_no: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function(v) {
                return /^[6-9][0-9]{9}$/.test(v);
            },
            message: "Phone number must be 10 digits and start with 6, 7, 8, or 9"
        }
    },
    checkin: {
        type: Date,
        required: [true, "Check-in date is required"],
        validate: {
            validator: function(value) {
                const minDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // yesterday
                const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year later
                return value >= minDate && value <= maxDate;
            },
            message: "Check-in date must be today or within 1 year from today"
        }
    },
    checkout: {
        type: Date,
        required: [true, "Checkout date is required"],
        validate: [
            {
                validator: function(value) {
                    return value > this.checkin;
                },
                message: "Checkout date must be after check-in date"
            },
            {
                validator: function(value) {
                    const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year later
                    return value <= maxDate;
                },
                message: "Checkout date cannot be more than 1 year from today"
            }
        ]
    },
    bookingAt: {
        type: Date,
        default: Date.now(),
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: "Booking date cannot be in the future"
        }
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"],
        default: 0
    },
    bookingStatus: {
        type: String,
        enum: {
            values: ['pending', 'confirmed', 'cancelled'],
            message: "Booking status must be pending, confirmed, or cancelled"
        },
        default: 'confirmed',
    },
});

module.exports = mongoose.model("booking", bookingSchema);
