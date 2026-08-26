const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imgUrl:{
        type:String,
        required:[true,"img url is required for post"],
    },
    user:{
        type:String,
        ref:"users",
        required:[true, "User id is required for creating post"]
    }

})

const postModel = mongoose.model("posts",postSchema)
module.exports = postModel;