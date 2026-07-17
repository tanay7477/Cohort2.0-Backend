const mongoose = require('mongoose')

const connectToDB =  async function connectToDB(){
     await mongoose.connect(process.env.MONGO_URI)
    // .then(()=>{
        console.log("MONGODB conected !")
    // })
}

module.exports = connectToDB