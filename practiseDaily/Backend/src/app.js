const express = require("express")
const app = express()
const notesRouter = require('../routes/notes.routes')

require('dotenv').config()

const connectToDB = require('../config/database')
connectToDB()

app.use(express.json())
app.use('/api/notes',notesRouter)



module.exports = app