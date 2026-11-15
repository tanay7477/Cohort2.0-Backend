const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const identifyUser = require('../middlewares/auth.middleware')
const multer = require('multer')
// multer do use hai 
//* - server ko form-data format samj aae 
//* - file ko cloud pe store kroge but temporarily store krne ke liye ram or memorystorage (dono ek hi hai) pe rkhoge
const upload = multer({storage: multer.memoryStorage()})

/* how to use multer
/route main middle main route main controller ke beech main you can check routes file
/ jis name se file frontend se aae whi backend main rkhni

///!api1
/**
 * @route POST /api/post [protected] only authorized user can make acces on this
 * -> req.body = { caption ,image-file }
 */
postRouter.post('/',upload.single("animatedProfile") ,identifyUser, postController.createPostController)
//multiple files hue to upload.array and req.files

//!api2
/**
 * @route GET /api/posts/ [protected]
 * @description //pehle server identify krega kis user ne req kri hai 
   //then ddatabase m search krega 
   // then return krega 
 */
   
postRouter.get('/', identifyUser ,postController.getPostController)

//!api3
/**
 * @route GET /api/posts/details/:postId [protected]
 * @description checks that post belong to user requesting
 * return deatils about that specific post with the id
 */
postRouter.get('/details/:postId', identifyUser ,postController.getPostDetailsController)

//!api4
/**
 * @route POST /api/posts/like/:postId
 * @description like a post with id provided in req.params
 */
postRouter.post('/like/:postId', identifyUser , postController.likePostController )

//!api5
/**
 * @route Post /api/posts/unlike/:postId
 * @description unlike post with id provided in req.params
 */
postRouter.post('/unlike/:postId', identifyUser , postController.unLikePostController)

//!api6
/**
 * @route GET /api/posts/feed
 * @description get the feed of posts for the authenticated user
 * @access private //only logged in user can access this route
 */
postRouter.get('/feed', identifyUser , postController.getFeedController )
 

module.exports = postRouter