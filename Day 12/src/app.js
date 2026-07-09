const express = require('express')
const app =express()
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
//yeh prefix isliye bnaya becoz react main jab routes call and all kre to koi conflict na ho


module.exports = app;