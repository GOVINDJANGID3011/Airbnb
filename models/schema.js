const { required } = require('joi');
const mongoose = require('mongoose');

const listingschema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
        type: Array,
        default: [
            {
                filename: "listingimage",
                url: "/images/sample_house_1.jpg",
            },
            {
                filename: "listingimage",
                url: "/images/sample_house_2.jpg",                    
            },
            {
                filename: "listingimage",
                url: "/images/sample_house_3.jpg",                    
            }
        ],
        set: function(input) {
            // Ensure input is an array and not empty
            if (Array.isArray(input) && input.length > 0) {
                return input;
            } else {
                // Return default images if input is empty or not an array
                return [
                    {
                        filename: "listingimage",
                        url: "/images/sample_house_1.jpg",
                    },
                    {
                        filename: "listingimage",
                        url: "/images/sample_house_2.jpg",                    },
                    {
                        filename: "listingimage",
                        url: "/images/sample_house_3.jpg",                    }
                ];
            }
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
    },
    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "review"
        }
    ],
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    geography: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (val) {
                  return val.length === 2;
                },
                message: 'Coordinates must be [longitude, latitude]'
            }
        }
    },
    category_type:{
        type:String,
        enum: ['luxury','budget','boutique','resort','hostel','apartment','villa','motel','beach','trending','rooms','iconic_cities','mountain','castles','pools','camping','farm','desert','forest', 'house', 'ferry','airports','ship','bungalow','hotel','cottage'],
        default:'rooms',
        required:true,
    }   
},
{
    Timestamps: true // add createdAt and updatedAt fields automatically
});

const listing = mongoose.model('listing', listingschema);

module.exports = listing;
