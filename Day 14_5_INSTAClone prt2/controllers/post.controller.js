const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model")

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

//!Problems here is that hum jab bhi api bna rhe hai hum user ko verify kr rhe to har var same type ke code likh rhe
//!same type of code repreat ho rha so next class m hum middle ware use krnge
//* yeh problem solve kr di aj humne middleware ke through
//*
async function createPostController(req, res) {
  console.log(req.body, req.file); //?server sejo file aai wo req.file main hai

  //     [Object: null prototype] { caption: 'test_caption' } {
  //   fieldname: 'image',
  //   originalname: 'young-indian-man-happy-outdoors-looking-camera-39595562.webp',
  //   encoding: '7bit',
  //   mimetype: 'image/webp',
  //   buffer: <Buffer 52 49 46 46 74 9d 00 00 57 45 42 50 56 50 38 20 68 9d 00 00 d0 57 03 9d 01 2a 58 02 84 03 3e 91 44 9c 4b 25 a3 a6 31 a4 53 b9 f2 30 12 09 65 6d c4 7d ... 40266 more bytes>,
  //   size: 40316
  // }jiss format m ssd main data rhta usi format m aya

  // you get response of such type in terminal

  //
  //*
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test", //agr tum imagekit pe file ko khin kisi folder main store krna hai to folder mention kr do
    // folder:"cohort"  //*for nested folders use slace and write name*/
  });

  //Jab tum imagekit.files.upload(...) call karte ho, ye function ImageKit ke server (cloud) ko ek network request (API call) bhejta hai — usme tumhari image ka buffer/data hota hai.
  // Uske baad kya hota hai (ImageKit ke server pe)
  // ImageKit tumhari image receive karta hai
  // Usko apne cloud storage (jaise AWS S3 jaisa kuch) pe save karta hai
  // Us stored image ke liye ek public accessible URL generate karta hai (jaise https://ik.imagekit.io/your_id/Test_xyz123.webp)
  // Ye poori information ek JSON response ke roop mein wapas bhejta hai

  // res.send(file)

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id, //req.user.id m user ki id aa rhi h jo middleware m decoded m aa rhi h
  });

  res.status(201).json({
    message: "post created successfully!",
    post,
  });
}
//now jo file aai hume wo cloud pe bhejnni hai
//*
async function getPostController(req, res) {
  //decoded ke andr id aaegi jis user ka token verify hua hai
  const userId = req.user.id; //req.user.id m user ki id aa rhi h jo middleware m decoded m aa rhi h

  const posts = await postModel.find({
    user: userId, //hum database main user ki id user m rkhe hue hai
  });
  res.status(200).json({
    message: "post fetched successfully!",
    posts,
  });
}
//*
async function getPostDetailsController(req, res) {
  const userId = req.user.id; //req.user.id m user ki id aa rhi h jo middleware m decoded m aa rhi h
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found!",
    });
  }

  const isValidUser = post.user.toString() === userId; //-> yeh decode m thi to already ek string hogi
  // js main id compare krte time === use krte hai to wo normal values compare jesa nhi hota . inki kuch methods hote check all methods
  // we are using toString method to convert both values to string before comparing them. This ensures that the comparison is done based on the actual string representation of the values, rather than their object references or types.
  //jis user ne post req kri wo match hgya jiss user ne content creaate kiya usse to kaam done
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "post fetched succesfully!",
    post,
  });
}

async function likePostController(req,res){
  const username = req.user.username
  const postId = req.params.postId

  //kya post exist krti bhi hai
  const post = await postModel.findById({
    postId
  })

  if(!post){
    return res.status(404).json({
      message: "post not found"
    })
  }

  const  like = await likeModel.create({
    post:postId,
    user:username
  })

}



module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController
};
