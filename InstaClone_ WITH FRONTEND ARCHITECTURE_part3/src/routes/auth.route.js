const express = require('express');

const authRouter = express.Router();
const controller = require('../controllers/auth.controller')
const identifyUser = require("../middlewares/auth.middleware")

/**
 * @route Post /api/auth/register
 */
authRouter.post('/register',controller.registerController)

/**
 * @route Post /api/auth/login
 */
authRouter.post('/login',controller.loginController)

/**
 * @route Get /api/user/get-me
 * @desc Get the currently logged in user info
 * @access Private
 */
authRouter.get("/get-me",identifyUser , controller.getMeController)


module.exports = authRouter