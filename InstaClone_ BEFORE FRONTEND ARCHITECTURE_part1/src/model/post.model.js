const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imgUrl:{
        type:String,
        required:[true,"img_url is required for post"]
    },

    // user field wo hai jisme tu store karega ki ye post kisne banaya hai 
    // — matlab post ke saath uske creator/owner ka reference.
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //ref main model ka name hota collection ka nahi
        required:[true , "user id is required for creating an post"]
    },


})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel;