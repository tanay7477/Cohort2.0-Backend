const express = require("express");

const userController = require('../controllers/user.controller')

const userRouter = express.Router();

const identifyUser  = require("../middleware/auth.middleware")

/**
 * @route /api/users/follow/:userid jiss user ko follow kroge uski id hogi yahan 
 * / agr koi user a b c jo bhi iss api pe req krega server ko wo pta hona chahie kon user iss api pe req kr rha 
 * @description follow a user
 * @access private
 */ 

// now agr koi user 
userRouter.post("follow/:username", identifyUser , userController.followUserController)



module.exports = userRouter;