const { required } = require('joi');
const mongoose = require('mongoose');

const listingschema = mongoose.Schema({
    title: {
        type: String,
        default: "bye",
    },
    description: {
        type: String,
    },
    image: {
        type: Array,
        default: [
            {
                filename: "listingimage",
                url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            },
            {
                filename: "listingimage",
                url: "https://images.unsplash.com/photo-1506748686217-dfb36f7a8a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFuJTIwbmF0dXJlJTIwY2F0ZWdvcnklMkZpYWwwfHwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            },
            {
                filename: "listingimage",
                url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG93ZWx8ZW58MHx8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
                        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
                    },
                    {
                        filename: "listingimage",
                        url: "https://images.unsplash.com/photo-1506748686217-dfb36f7a8a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFuJTIwbmF0dXJlJTIwY2F0ZWdvcnklMkZpYWwwfHwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    },
                    {
                        filename: "listingimage",
                        url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG93ZWx8ZW58MHx8fDB8fHww&auto=format&fit=crop&w=800&q=60",
                    }
                ];
            }
        }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "review"
        }
    ],
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    geography: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    category_type:{
        type:String,
        enum: ['luxury','budget','boutique','resort','hostel','apartment','villa','motel','beach','trending','rooms','iconic_cities','mountain','castles','pools','camping','farm','desert','forest', 'house', 'ferry','airports','ship','bungalow','hotel','cottage'],
        default:'rooms',
        required:true,
    },
});

const listing = mongoose.model('listing', listingschema);

module.exports = listing;
