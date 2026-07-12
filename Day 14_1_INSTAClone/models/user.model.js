const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requird:[true, "Username is require !"],
        unique: [true, "Username already exist!"]
    },
    email:{
        type:String,
        required:[true, "Email is require !"],
        unique: [true, "Email is require !"]
    },
    password:{
        type:String,
        required:[true, "Password is require !"],
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/b74kwxfi3/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.avif?updatedAt=1783836023543"
    }

})

const userModel = mongoose.model("users" , userSchema)

module.exports = userModel;