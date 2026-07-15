const postModel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit = new ImageKit({
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})


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

  const token = req.cookies.token
   

  // if(!token){ //agr token expired ho gya yaah user register hi nhi hai 
  //   return res.status(401).json({
  //     message: 'token not provided , unauthorized access'
  //   })
  // }
  //agr token glt hai to code server ko show krna chahie 401 but 500 show kr rha 
//!if se nhi krte yeh use try catch
let decoded = null;
  try{
    decoded = jwt.verify(token , process.env.JWT_SECRET)
    // here you get error decoded is not defined  becoz of scope so we declare outside
  }catch(err){ // agr tooken glt hua to yeh chlega catch usse handle krega
     return res.status(401).json({
      message: 'token not provided , unauthorized access'
    })
  }


  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'Test', //agr tum imagekit pe file ko khin kisi folder main store krna hai to folder mention kr do
    // folder:"cohort"  //*for nested folders use slace and write name*/ 
  })
  res.send(file)
  //yeh tumhare file ko server se imagekit cloud tk paucha rhi
 
   const post = await postModel.create({
      caption: req.body.caption,
      imgUrl:file.url,
      user:decoded.id
   })

   res.status(201).json({
    message:"post created successfully!",
    post
   })

}
//now jo file aai hume wo cloud pe bhejnni hai

module.exports = { createPostController };
