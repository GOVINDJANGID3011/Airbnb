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
    // Forward geocoding for location
    const result = await geocodingClient.forwardGeocode({
        query: req.body.list.location,
        limit: 1
    }).send();

    let newlist = new listing(req.body.list);

    if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
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
};

module.exports.edit_listing_form = async (req, res) => {
    let { id } = req.params;
    let list = await listing.findById(id);

    if (!list) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect('/listings');
    }

    let preview_url = list.image[0].url.replace(
        '/upload',
        '/upload/ar_1.0,h_150,w_250/bo_5px_solid_lightblue'
    );

    console.log("successfully showing edit listing form");
    return res.render('listings/edit_listing.ejs', { list, preview_url });
};

module.exports.update_listing = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, req.body.list);

    if (req.files && req.files.length > 0) {
        let updatedList = await listing.findById(id);
        for (let i = 0; i < req.files.length; i++) {
            let url = req.files[i].path;
            let filename = req.files[i].filename;
            updatedList.image[i] = { url, filename };
        }
        await updatedList.save();
    }

    req.flash('success', "Listing is Updated");
    console.log("successfully updated the listing");
    return res.redirect(`/listings/view/${id}`);
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
