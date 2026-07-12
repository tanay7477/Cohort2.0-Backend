const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  }
    
   //ek hi email se multiple accounts na bn paae
    
})

const userModel = mongoose.model('users', userSchema)
//userModel ki help se hi hum dataBase main crud operation kr pate hai

module.exports = userModel;