const express = require('express')
const userController = require('../controllers/user.controller')
const userRouter = express.Router();
const identifyUser = require('../middlewares/auth.middleware')

/**
 * @route Post /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post('/follow/:username', identifyUser ,userController.followUserController)

/**
 * @route POST /api/users/unfollow/:userid
 * @description unfollow a user
 * @access private
 */
userRouter.post('/unfollow/:username', identifyUser ,userController.unfollowUserController)

/**
 * @route POST /api/users/follow/status/:userid
 * @description status can be pending , accepted , route
 */
userRouter.post('/follow/status/:username' , identifyUser , userController.followReqAcceptorRejectController)

module.exports = userRouter;
