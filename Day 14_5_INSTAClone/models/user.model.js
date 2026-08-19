const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is require !"],
    unique: [true, "Username already exist!"],
  },
  email: {
    type: String,
    required: [true, "Email is require !"],
    unique: [true, "Email is require !"],
  },
  password: {
    type: String,
    required: [true, "Password is require !"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/b74kwxfi3/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.avif?updatedAt=1783836023543",
  },

  //agr mere 200 followers hai to 200 id store krni pdegi isliye array m rkha h
  // 1 id = 12 bytes
  // virat has 274 millions follower so 274millions *12bytes = 3.288GB itne size ka data store hoga
  // max document size 16MB h so yhi pe system fail ho jaaega 
  //iska solution hai edge collection
 followers:[{
  type: mongoose.Schema.Types.ObjectId, //users ki id store krega
  ref: "users"
 }],

 following:[{
  type:mongoose.Schema.Types.ObjectId,
  ref: "users"
 }]

});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
