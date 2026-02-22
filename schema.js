
const Joi = require('joi');

module.exports.listingValidationSchema = Joi.object({
    list:Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(1),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category_type: Joi.string().valid('luxury','budget','boutique','resort','hostel','apartment','villa','motel','beach','trending','rooms','iconic_cities','mountain','castles','pools','camping','farm','desert','forest', 'house', 'ferry','airports','ship','bungalow','hotel','cottage').required(),
    }).required(),
    deletedImages: Joi.string().optional()    // it can be empty too
});


module.exports.reviewValidationSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});

module.exports.bookingValidationSchema = Joi.object({
    fullname: Joi.string()
        .trim()                           // remove extra spaces
        .replace(/\s{2,}/g, " ")          // replace multiple spaces with one
        .min(3)                           // at least 3 chars
        .max(50)                          // max 50 chars
        .pattern(/^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/) // only letters & spaces, no leading/trailing space
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name must not exceed 50 characters",
            "string.pattern.base": "Full name must only contain letters and spaces (no leading/trailing spaces)",
        }),

    phone_no: Joi.string()
        .trim()
        .pattern(/^[6-9][0-9]{9}$/)        // stricter: must start with 6–9 (common mobile number format)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be exactly 10 digits and start with 6, 7, 8, or 9",
        }),

    checkin: Joi.date()
        .min(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))     // cannot be in past
        .max(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) // within 1 year
        .required()
        .messages({
          "date.base": "Check-in must be a valid date",
          "date.min": "Check-in date cannot be before today",
          "date.max": "Check-in date cannot be more than 1 year from today",
          "any.required": "Check-in date is required",
        }),

    checkout: Joi.date()
        .greater(Joi.ref("checkin"))                   // must be after checkin
        .max(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) // within 1 year
        .required()
        .messages({
            "date.base": "Checkout must be a valid date",
            "date.greater": "Checkout date must be strictly after check-in date",
            "date.max": "Checkout date cannot be more than 1 year from today",
            "any.required": "Checkout date is required",
        }),



    bookingAt: Joi.date()
        .less("now")                       // bookingAt must be in past
        .max("now")                        // cannot be future
        .optional()
        .messages({
            "date.base": "Booking time must be a valid date",
            "date.less": "Booking time cannot be in the future",
            "date.max": "Booking time cannot be in the future",
        }),

    bookingStatus: Joi.string()
        .valid("pending", "confirmed", "cancelled")
        .insensitive()                     // case-insensitive
        .default("pending")
        .optional()
        .messages({
            "any.only": "Booking status must be one of pending, confirmed, cancelled",
        }),
    });
