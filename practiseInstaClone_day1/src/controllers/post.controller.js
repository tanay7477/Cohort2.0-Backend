const postModel = require("../model/post.model");
const likeModel = require('../model/like.model');

const jwt = require("jsonwebtoken");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    try{

 

  const { caption, imgUrl } = req.body;

  //iss controller ke through post create hogi and usse cloud pe upload hogi
  //kese krenge yeh for that you can read imagekit.io documentation


  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-inta-clone-posts",
    //for nested folder use / slace
  });
  res.send(file);

  
 //middleware se jo data controller tk ana hai wo req.user property ke through hoga

  const post = await postModel.create({
    caption: caption,
    imgUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "post created successfully!",
    post,
  });
    }
    catch(error){
          console.log(error);

    return res.status(500).json({
        message: "something went wrong!"
    });

    }
 
}

//                   what & how , this controller does?
// ┌─────────────────────────────────────────────────────────────────┐
// │                     POST IMAGE UPLOAD FLOW                       │
// └─────────────────────────────────────────────────────────────────┘

//   [Client / Postman]
//          │
//          │  POST request (multipart/form-data)
//          │  { caption, image (file) }
//          ▼
//   ┌──────────────┐
//   │   API Route   │   e.g. POST /api/posts
//   └──────┬────────┘
//          │
//          ▼
//   ┌───────────────────────┐
//   │  Multer Middleware      │
//   │  (memoryStorage)        │
//   │                          │
//   │  - File ko temporarily   │
//   │    RAM mein store karta  │
//   │    hai (req.file.buffer) │
//   │  - Text fields ko        │
//   │    req.body mein daalta  │
//   └──────┬────────────────┘
//          │
//          │  req.file.buffer  (raw image data)
//          │  req.body.caption
//          ▼
//   ┌───────────────────────┐
//   │      Controller          │
//   │                          │
//   │  - req.file.buffer lega  │
//   │  - Cloud service ko      │
//   │    upload call karega    │
//   │    (ImageKit/Cloudinary) │
//   └──────┬────────────────┘
//          │
//          │  buffer bhejta hai
//          ▼
//   ┌───────────────────────┐
//   │   Cloud Storage           │
//   │   (ImageKit/Cloudinary)   │
//   │                          │
//   │  - Image ko permanently   │
//   │    store karta hai        │
//   │  - URL wapas bhejta hai   │
//   └──────┬────────────────┘
//          │
//          │  { url: "https://..." }
//          ▼
//   ┌───────────────────────┐
//   │      Controller           │
//   │                          │
//   │  - Mila hua URL          │
//   │  - MongoDB mein Post     │
//   │    document save karta   │
//   │    hai (caption + image  │
//   │    URL + user ID)        │
//   └──────┬────────────────┘
//          │
//          ▼
//   ┌───────────────────────┐
//   │      MongoDB               │
//   │   (posts collection)       │
//   │                          │
//   │  { caption, image: URL,  │
//   │    user: ObjectId }      │
//   └───────────────────────┘
//          │
//          ▼
//   [Response wapas Client ko]
//   { message: "Post created", post: {...} }


async function getPostController(req,res){
    try{ 
        
    const userId = req.user.id;

    // const posts = await postModel.findById(userId) //probblem with this : yeh bolta ki jis post ki id == userId hai wo find kro

    const posts = await postModel.find({
        user : userId 
    })

    if(!posts){
        return res.status(401).json({
            message:"unauthorized access!"

        })
    }
    res.status(200).json({
        message :"here are your all posts",
        posts
    });
}catch(error){
    console.log(error);
    res.status(500).json({
        message: "something went wrong!"

    })
}
}

async function getPostDetailsController(req,res){
  
    const userId = req.user.id;
    const postId = req.params.postId
    
    const post = await postModel.findById(
        postId
    )

    if(!post){
        return res.status(404).json({
            message:"post not found!"

        })
    }
    const isValidUser = post.user.toString() === userId 
    //do id normally ese compare hoti 

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden Content!"
        })
    }
    return res.status(200).json({
        message:"here is your requested post",
        post
    })


}


async function likePostController(req, res) {
    try {
        const postid = req.params.postid;
        const username = req.user.username;

        // does post exist...
        const post = await postModel.findById(postid);
        if (!post) {
            return res.status(404).json({
                message: "post doesnot exist"
            });
        }

        const like = await likeModel.create({
            post: postid,
            user: username
        });

        return res.status(201).json({
            message: "like done successfully",
            like
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "post already liked"
            });
        }
        return res.status(500).json({
            message: "server error"
        });
    }
}
    


module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController
};
