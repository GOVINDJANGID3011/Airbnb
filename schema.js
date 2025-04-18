
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
});


module.exports.reviewValidationSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});

module.exports.bookingValidationSchema = Joi.object({
    fullname: Joi.string().required(),
    phone_no: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be exactly 10 digits',
        }),
    checkin: Joi.date()
        .min('now')
        .required()
        .messages({
            'date.min': 'Check-in date cannot be in the past',
        }),
    checkout: Joi.date()
        .min('now')
        .greater(Joi.ref('checkin'))
        .required()
        .messages({
            'date.min': 'Checkout date cannot be in the past',
            'date.greater': 'Checkout date must be after check-in date',
        }),
    bookingAt: Joi.date().optional(),
    bookingStatus: Joi.string().valid('pending', 'confirmed', 'cancelled').optional(),
});
