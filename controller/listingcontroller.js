const listing=require('../models/schema.js');
const review=require('../models/review_schema.js');
const expressError=require('../utils/expressError.js');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken});

module.exports.index = async (req, res) => {
    let all_listings = await listing.find({});
    console.log("successfully showing all listings page");
    return res.render('./listings/all_listing.ejs', { all_listings });
};

module.exports.view_listing = async (req, res) => {
    let { id } = req.params;
    let list = await listing.findById(id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('owner');

    if (!list) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect('/listings');
    }

    console.log("successfully showing single listing page");
    return res.render('./listings/listing.ejs', { list });
};

module.exports.new_listing_form = async (req, res) => {
    console.log("successfully showing new listing form");
    return res.render('./listings/new_listing.ejs');
};

module.exports.add_new_listing = async (req, res) => {
    try {
        
    // Forward geocoding for location
    const result = await geocodingClient.forwardGeocode({
        query: req.body.list.location,
        limit: 1
    }).send();

    let newlist = new listing(req.body.list);
    
    if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
            if(i>=10){
                break; // limit to 10 images
            }
            let url = req.files[i].path;
            let filename = req.files[i].filename;
            newlist.image[i] = { url, filename };
        }
    }

    newlist.owner = req.user._id;
    newlist.geography = result.body.features[0].geometry; // saving geo-coordinates
    await newlist.save();

    req.flash('success', "New listing created");
    console.log("successfully added new listing");
    return res.redirect('/listings');

    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/listings/new_listing');
    }
};

module.exports.edit_listing_form = async (req, res) => {
    let { id } = req.params;
    let list = await listing.findById(id);

    if (!list) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect('/listings');
    }

    // 🔥 Create preview URLs for ALL images
    const preview_urls = list.image.map(img => 
        img.url.replace(
            '/upload',
            '/upload/ar_1.0,h_150,w_250/bo_5px_solid_lightblue'
        )
    );

    console.log("successfully showing edit listing form");
    return res.render('listings/edit_listing.ejs', {
        list,
        preview_urls
    });
};

module.exports.update_listing = async (req, res) => {
    try {
        console.log("reached at start of update listing");
        const { id } = req.params;
        const { deletedImages } = req.body;
        
        const list = await listing.findById(id);
        
        if (!list) {
            req.flash("error", "Listing you requested for does not exist");
            return res.redirect('/listings');
        }
    
        // validation is added here
        //check required fields in the req.body.list and if any is missing, than redirect back to previos page with error flash message
        const { title, description, price, location, country } = req.body.list;
        if (!title || !description || !price || !location || !country) {
            req.flash('error', 'All fields are required');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //title validation
        if (title.length < 3 || title.length > 100) {
            req.flash('error', 'Title must be between 3 and 100 characters');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //description validation
        if (description.length < 10 || description.length > 1000) {
            req.flash('error', 'Description must be between 10 and 1000 characters');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //price validation
        if (isNaN(price) || price < 0) {
            req.flash('error', 'Price must be a non-negative number');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //location validation
        if (location.trim().length === 0) {
            req.flash('error', 'Location is required');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //country validation
        if (country.trim().length === 0) {
            req.flash('error', 'Country is required');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //category validation
        if (!req.body.list.category_type) {
            req.flash('error', 'Category is required');
            return res.redirect(`/listings/edit/${id}`);
        }
    
        //update listing details
        list.title = req.body.list.title;
        list.description = req.body.list.description;
        list.price = req.body.list.price;
        list.location = req.body.list.location;
        list.country = req.body.list.country;
        list.category = req.body.list.category;
    
        /* ================= DELETE IMAGES ================= */
        let imagesToDelete = [];
        if (deletedImages) {
            imagesToDelete = JSON.parse(deletedImages);
        }

        list.image = list.image.filter(img => !imagesToDelete.includes(img.url));
        console.log("Images after deletion:", list.image.length);

        /* ================= ADD NEW IMAGES ================= */
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                if (list.image.length >= 10) break;

                list.image.push({
                    url: file.path,
                    filename: file.filename
                });
            }
        }

        console.log("Images after adding new:", list.image.length);

        /* ================= MIN IMAGE VALIDATION ================= */
        if (list.image.length < 3) {
            const defaultImages = [
                { url: '/images/sample_house_1.jpg', filename: 'sample_house_1.jpg' },
                { url: '/images/sample_house_2.jpg', filename: 'sample_house_2.jpg' },
                { url: '/images/sample_house_3.jpg', filename: 'sample_house_3.jpg' }
            ];

            let i = 0;
            while (list.image.length < 3 && i < defaultImages.length) {
                list.image.push(defaultImages[i]);
                i++;
            }
        }

        console.log("Final image count:", list.image.length);
        await list.save();
        req.flash('success', 'Listing updated successfully');
        res.redirect(`/listings/view/${id}`);
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect(`/listings/edit/${req.params.id}`);
    }
};

module.exports.delete_listing = async (req, res) => {
    let { id } = req.params;
    let del_listing = await listing.findById(id);

    if (!del_listing) {
        req.flash("error", "Listing not found");
        return res.redirect('/listings');
    }

    // Delete associated reviews
    await review.deleteMany({ _id: { $in: del_listing.reviews } });
    await listing.findByIdAndDelete(id);

    req.flash('success', "Listing Deleted");
    console.log("successfully deleted the listing");
    return res.redirect('/listings');
};
