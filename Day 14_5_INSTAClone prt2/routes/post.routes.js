const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const identifyUser = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @routes POST /api/posts[protected] > 
 * we have to keep this [protected]
 so only authorised user can acces this
 @description create a post with the content and image (optional) 
*/
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);
//*frontend jiss name se file bhej rha ussi name se hume yahan file store krni rhegi
// middleware ko bss beech m likh do

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from
 */
//pehle server identify krega kis user ne req kri hai
//then ddatabase m search krega
// then return krega
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * @route Get /api/posts/details/:postid
 * @description return an detail about specific post with the id
 * also check whether post belong to user who is requesting
 */
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/**
 * @route Post /api/posts/like/:postid
 * @description like a post with the id provided in req params
 */

postRouter.post("/like/:postId", identifyUser , postController.likePostController)



module.exports = postRouter;
