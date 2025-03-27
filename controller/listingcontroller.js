const listing=require('../models/schema.js');
const review=require('../models/review_schema.js');
const expressError=require('../utils/expressError.js');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken});


module.exports.index=async (req,res)=>{
    let all_listings=await listing.find({});
    res.render('./listings/all_listing.ejs',{all_listings});
}

module.exports.view_listing=async(req,res)=>{
    

    let {id}=req.params;
    let list= await listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
    if(!list){
        req.flash("error","Listing you requested for do not exist");
        res.redirect('/listings');
    }
    res.render('./listings/listing.ejs',{list});
}

module.exports.new_lisitng_form=(req,res)=>{
    res.render('./listings/new_listing.ejs');
}

module.exports.add_new_listing=async(req,res,next)=>{
    // if(!req.body.list.image){
    //     req.body.list.image= {
    //         filename: "listingimage",
    //         url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    //     }
    // }
    // if(!req.body.list){
    //     throw new expressError(400,'Enter valid data');
    // }

    //for forward geocoding for a location
    const result=await geocodingClient.forwardGeocode({
        query:req.body.list.location ,
        limit: 1
        }).send();


    let newlist = await new listing(req.body.list);
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        newlist.image={url,filename};
    }
    newlist.owner=req.user._id;
    newlist.geography=result.body.features[0].geometry;  //saving geocoordinates
    await newlist.save();
    req.flash('success',"New listing created");
    res.redirect('/listings')
}

module.exports.edit_listing_form=async(req,res)=>{
     
    let{id}=req.params;
    let list= await listing.findById(id);
    if(!list){
        req.flash("error","Listing you requested for do not exist");
        res.redirect('/listings');
    }
    let preview_url=list.image.url.replace('/upload','/upload/ar_1.0,h_150,w_250/bo_5px_solid_lightblue');
    res.render('listings/edit_listing.ejs',{list ,preview_url});
}

module.exports.update_listing=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,req.body.list);
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        let newlist= await listing.findById(id);
        newlist.image={url,filename};
        await newlist.save();
    }
    req.flash('success',"Listing is Updated");
    res.redirect(`/listings/view/${id}`);
};

module.exports.delete_listing=async(req,res)=>{
    let{id}=req.params;
    let del_listing=await listing.findById(id);
    await review.deleteMany({_id:{$in:del_listing.reviews}})
    await listing.findByIdAndDelete(id);
    req.flash('success',"Listing Deleted");
    res.redirect('/listings');
}