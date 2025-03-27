const mongoose=require('mongoose');
const listing=require('../models/schema.js');
const connection=require('../models/connection.js');
const data=require('./data.js');

connection();

let init_data =async ()=>{
    await listing.deleteMany({});
    const newdata = data.map((obj)=>{
        obj.owner='67e447a987382f5c566acde5';
        return obj;
   });
   console.log(newdata);
   await listing.insertMany(newdata);
}

init_data().then(()=>{
    console.log("data inserted");
}).catch((err)=>{
    console.log(err);
})