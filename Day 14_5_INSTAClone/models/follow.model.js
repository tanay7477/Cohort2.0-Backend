const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Follower is required !"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Followee is required !"]
    }
//     type: mongoose.Schema.Types.ObjectId

// "Is field ke andar jo value aayegi, woh ek MongoDB ID honi chahiye — normal text ya number nahi."

// ref: "users"

// "Yeh ID jis document ko point kar rahi hai, woh users naam ke collection mein milega."
},{
    timestamps:true //yeh btata hai ki har document ke saath createdAt aur updatedAt ka time bhi store hoga
});

const followModel = mongoose.model("follows",followSchema);

module.exports = followModel;