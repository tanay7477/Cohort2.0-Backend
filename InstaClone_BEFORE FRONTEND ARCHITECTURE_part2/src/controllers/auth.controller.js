const userModel = require("../model/user.model");
// const crypto = require("crypto"); it provides a low level securty so now we use BCRYPT
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  try {
    const { username, email, password, bio, profileImage } = req.body;
    console.log("REGISTER BODY:", req.body);
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExist) {
      return res.status(409).json({
        message:
          isUserAlreadyExist.email === email
            ? "user already registered with this email"
            : "user already registered with this username",
      });
    }
    console.log("REGISTER BODY:", req.body);
    //older method for hashing
    // const hash = crypto.createHash("sha256").update(password).digest("hex");
    
    //new method for hashing
    const hash = await bcrypt.hash(password , 10 )//this 10 no is salt jo batat kitni layers of hashiing perform krnii


    const user = await userModel.create({
      username: username,
      email: email,
      bio: bio,
      password: hash,
      profileImage: profileImage,
    });

    console.log("CREATED USER:", user);

    const token = jwt.sign({ id: user._id , username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
});

    res.status(201).json({
      message: "user registered successfully!",
      user
    });
  } catch (error) {
       console.log("REGISTER CONTROLLER ERROR:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function loginController(req,res){
    const{username , email , password} = req.body

   if ((!email && !username ) || !password) {
    return res.status(400).json({
        message: "Email and password are required!"
    });
}

    const user = await userModel.findOne({
        $or:[{username} ,{email}]
    }).select("+password") //yeh line isliye likhi hai kyuki humne user schema main password ko select:false kr diya tha to by default password nhi milega to humne select:true krke password ko bhi le liya;
    
    console.log("LOGIN BODY:", req.body);
console.log("FOUND USER:", user);
    if(!user){
       return res.status(400).json({
            "message":"User not found!"
        })
    }

   // yeh dono kaam ek baar m ho janege -> hash convert  & compare
    // const pass = crypto.createHash("sha256").update(password).digest("hex")
     
   
    // if(pass !== user.password ){
    //       return res.status(401).json({ message: "Invalid email or password" });
    // }

    const isPassValid = await  bcrypt.compare(password , user.password ) //yeh line convert and compare dono kr detii hai

    if(!isPassValid){
       return res.status(401).json({ message: "Invalid email or password" });

    }

    const token = jwt.sign(
        {id:user._id , username:user.username} , process.env.JWT_SECRET , {expiresIn : "24h"}
    )
    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
});
console.log("LOGIN TOKEN CREATED:", !!token);
    res.status(201).json({
        message : " User loggedin successfully!",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profile_img,
        }
    })


}

async function getMeController(req,res){
  const userId = req.user.id

  const user = await userModel.findById(userId)

  res.status(200).json({
    user:{
      username : user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })

}

module.exports = {
  registerController,
  loginController,
  getMeController
};
