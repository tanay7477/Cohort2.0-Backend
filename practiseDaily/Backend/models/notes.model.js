const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            default:"Unknown"
        },
        description:{
            type:String,
            required:[true , "description can not be empty!"]
        },
        priority:{
            type:String,
            default:"Medium",
            enum:["low" , "medium" , "high"]
        }
     }

    // const notesModel = mongoose.model({})
);

const notesModel = mongoose.model("notesCollection" , notesSchema)

module.exports = notesModel
