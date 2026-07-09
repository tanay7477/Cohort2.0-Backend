const app = require('./src/app')
const connectToDB = require('./src/config/database')
require('dotenv').config()

const connnectToDB = require("./src/config/database")

connectToDB()//iss code ko import krne ka krn yeh hai ki jab server chalu hoga to uske sath hi 
//database se bhi connect ho janege !


app.listen(3000 ,()=>{
    console.log("Server is running on port 3000");
})