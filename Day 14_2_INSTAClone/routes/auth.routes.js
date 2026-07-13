const express = require('express')
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

// todo> POST /api/auth/register
authRouter.post('/register',authController.registerController )

authRouter.post('/login',authController.loginController)

module.exports = authRouter