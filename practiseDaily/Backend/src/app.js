const express = require("express")
const app = express()
const notesRouter = require('../routes/notes.routes')
const path = require('path');


require('dotenv').config()

const connectToDB = require('../config/database')
connectToDB()

app.use(express.json())
app.use('/api/notes',notesRouter)

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))//file system mainn kahan exist krti wo pura absolute path dena pdega uyahan
})

module.exports = app