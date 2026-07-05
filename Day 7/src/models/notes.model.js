//to create schema we have to first import mongoose
const mongoose = require("mongoose");

//create schema (yeh jo format jisme hum data ko store kaar rhe isi ko bolte schema)
const noteSchema = new mongoose.Schema({
    title:String,
    description:String
}); 
//yahan sabhi notes ka same format rhega 
//so jab bhut saraa data jo same type ka, ese data ko hum ek sath rkhte that we called collection
//so yeh collection ka name notes hoga and schema ka name noteSchema hoga
const noteModel = mongoose.model("notes",noteSchema);
//model ke bina hum database m crud operation nhi kar skte so model is very important

module.exports = noteModel; 