const express = require("express")
const postRouter= express.Router()
const postController = require('../controllers/post.controller')
// const getController = require('../controllers/post.controller')

const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})

/** POST /api/posts > 
 * we have to keep this [protected]
 so only authorised user can acces this 
*/
postRouter.post("/",upload.single("image"), postController.createPostController)
//*frontend jiss name se file bhej rha ussi name se hume yahan file store krni rhegi


/**
 * GET /api/posts/ [protected]
 */
   //pehle server identify krega kis user ne req kri hai 
   //then ddatabase m search krega 
   // then return krega 
  postRouter.get("/" , postController.getPostController)

/**
 * get /api/posts/details/:postid
 * return an detail about specific post with the id 
 * also check whether post belong to user who is requesting
 */
postRouter.get("/details/:postId" , postController.getPostDetailsController)

module.exports = postRouter