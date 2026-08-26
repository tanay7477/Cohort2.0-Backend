//edgeCOllection is implemented here.......

const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:{
        type:String,
    },
    followee:{
        type:String,
    }
//     type: mongoose.Schema.Types.ObjectId

// "Is field ke andar jo value aayegi, woh ek MongoDB ID honi chahiye — normal text ya number nahi."

// ref: "users"

// "Yeh ID jis document ko point kar rahi hai, woh users naam ke collection mein milega."
},{
    timestamps:true //yeh btata hai ki har document ke saath createdAt aur updatedAt ka time bhi store hoga
});

followSchema.index({follower:1, followee: 1}, {unique: true}) //kisi user ko ek bar follow kr liya to bar bar follow nhi ho wo 

const followModel = mongoose.model("follows",followSchema);

module.exports = followModel;

//backend m three layers hoti check or validation lgane ki 
//express validator 
//controller
//schema level pe

// and one aur multiple layers hoti frontend pe
