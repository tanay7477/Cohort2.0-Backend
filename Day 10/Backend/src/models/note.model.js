const mongoose = require('mongoose');

const noteSchema =new mongoose.Schema({
    title:String,
    description:String,
})

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
//iss noteModel ka use krte hue hum jo bhi data bnaenge wo notes collection m jake store hoga