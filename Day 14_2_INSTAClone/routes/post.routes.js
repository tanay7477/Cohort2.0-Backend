const express = require("express")
const postRouter= express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})

/** POST /api/posts > 
 * we ave to keep this [protected]
 so only authorised user can acces this 
*/

postRouter.post("/",upload.single("image"), postController.createPostController)
//*frontend jiss name se file bhej rha ussi name se hume yahan file store krni rhegi
module.exports = postRouter