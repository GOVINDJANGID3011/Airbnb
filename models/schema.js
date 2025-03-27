const { types, array } = require('joi');
const mongoose=require('mongoose');


const listingschema=mongoose.Schema({
    title:{
        type:String,
        default:"bye",
    },
    description:{
        type:String,
    },
    image: {
        type: Object,
        default: {
            filename: "listingimage", // Default filename
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Default URL
        },
        set: function(input) {
            // Check if an image URL is provided in the input
            if (input && input.url) {
                // If a URL is provided, use it
                return {
                    filename: "listingimage", // Keep filename fixed as "listingimage"
                    url: input.url, // Use the provided URL
                };
            } else {
                // If no URL is provided, use the default URL
                return {
                    filename: "listingimage", // Keep filename fixed as "listingimage"
                    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Default URL
                };
            }
        }
    },    
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"review"
        }
    ],
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    geography:{
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
    }
});

const listing=mongoose.model('listing',listingschema);

module.exports=listing;