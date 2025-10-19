require('dotenv').config({ path: '../.env' });   // use only when you running  add_data.js file because that time without config you can't access keys of .env file
const mongoose=require('mongoose');

let builtconnection= async ()=>{
    let mongo_url=process.env.mongo_atlas_url;
    await mongoose.connect(mongo_url);
    console.log('connection successful');
}

module.exports=builtconnection;
 