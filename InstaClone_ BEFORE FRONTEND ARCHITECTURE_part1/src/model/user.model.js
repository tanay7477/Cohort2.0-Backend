const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , 'username is required'],
        unique: [true , 'this username already used']
    },

    email: {
        type: String,
         required: [true , 'username is required'],
        unique: [true , 'this username already used']
    },

    password: {
        type: String,
        required: [true , 'username is required']
    },

    bio: {
        type: String,
        default: ''
    },

    profile_img: {
        type: String,
        default: 'https://ik.imagekit.io/b74kwxfi3/Test_T43NOArzS?updatedAt=1783954472047'
    }
});

const userModel = mongoose.model('User', userSchema);//model name User hai 

module.exports = userModel;