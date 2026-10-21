const mongoose = require('mongoose')

const followSchema = new mongoose.Schema(
    {
    follower:{
        type:String,
        required: [true , "Follower is required!"]
    },
    followee:{
         type:String,
        required: [true , "Follower is required!"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:[ "pending","accepted","rejected" ],
            message:"status can only be pending , accepted or rejected"
        }
    }
  },{
        timestamps:true
        //Timestamps = wo fields jo batate hain ki koi document kab create hua aur kab last update hua.
    }
)
followSchema.index({follower:1,followee:1},{unique:true}) 
// follower kisi followee ko dobara follow nhi kar paae

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel