const listing=require('../models/schema.js');
const review=require('../models/review_schema.js');
// const expressError=require('../utils/expressError.js');

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
    //for forward geocoding for a location
    const result=await geocodingClient.forwardGeocode({
        query:req.body.list.location ,
        limit: 1
        }).send();


    let newlist = await new listing(req.body.list);
    if(req.files){
        for(let i=0;i<(req.files).length;i++){
            let url=req.files[i].path;
            let filename=req.files[i].filename;
            newlist.image[i]={url,filename};
        }
    }
    newlist.owner=req.user._id;
    newlist.geography=result.body.features[0].geometry;  //saving geocoordinates
    console.log(newlist);
    await newlist.save();
    req.flash('success',"New listing created");
    res.redirect('/listings');
}

module.exports.edit_listing_form=async(req,res)=>{
     
    let{id}=req.params;
    let list= await listing.findById(id);
    if(!list){
        req.flash("error","Listing you requested for do not exist");
        res.redirect('/listings');
    }
    let preview_url=list.image[0].url.replace('/upload','/upload/ar_1.0,h_150,w_250/bo_5px_solid_lightblue');
    res.render('listings/edit_listing.ejs',{list ,preview_url});
}

module.exports.update_listing=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,req.body.list);
    if(req.files){
        let newlist= await listing.findById(id);
        for(let i=0;i<(req.files).length;i++){
                let url=req.files[i].path;
                let filename=req.files[i].filename;
                console.log(url);
                console.log(filename);
                newlist.image[i]={url,filename};
        }
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