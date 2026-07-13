require('dotenv').config() //this line must be written on the top of server.js

const app = require('./src/app')

const connectToDatabase = require('./config/database')
connectToDatabase()



app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})