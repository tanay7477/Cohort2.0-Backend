const postModel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')


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

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'Test'
  })
  res.send(file)
  //yeh tumhare file ko server se imagekit cloud tk paucha rhi


}
//now jo file aai hume wo cloud pe bhejnni hai

module.exports = { createPostController };
