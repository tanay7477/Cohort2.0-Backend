const userModel = require("../models/user.model");

// const crypto = require('crypto')
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  //! Problem with this code is that hume do baar alg alg database ko cll krna pda
  //! But this practise is bad becoz databse pe load pdega isse
  // const isUserExistByEmaail = await userModel.findOne({email})

  // //*Check applied
  // if(isUserExistByEmaail){
  //     return res.status(409).json({
  //         message: "User already exist with this email"
  //     })
  // }

  // const isUserExistByUsername = await userModel.findOne({username})

  // //*Check applied
  // if(isUserExistByUsername){
  //     return res.status(409).json({
  //         message: "User already exist with this UserName"
  //     })
  // }

  //! Better practise jisse ek bar main email and username dono check kr lenege
  //* so we used {$or} operator jo ek baar main dono username and email dono ke bais pe check kr lega and
  //* and return krdega jiske basis pe user already exist
  const isUserAlreadyExists = await userModel.findOne({
    //? yeh function check krrega
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exist" + isUserAlreadyExists.email == email
          ? "User already exist with this Email"
          : "User already exist with this Username",
    });
  }

  // const hash = crypto.createHash('sha256').update(password).digest('hex')
  //? itni badi line likhne ki jagah

  const hash = await bcrypt.hash(password, 10); //this no is called salt means kinti layers of hashing krni

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  //* we store this token in cookies so install package npm i cookie-parser

  res.cookie("token", token);

  res.status(201).json({
    message: "User register succesfully!",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
    //? this all details send to frontend so frontend pe dikha paae
  });
  //! Due to hardest security rules we never send user password in response
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    //* user here can login in two way-
    //? username & password
    //? email & password

    $or: [
      //yeh array hote conditions ke jinme conditions likhte hum
      {
        //condition 1
        username: username,
      },
      {
        //condition 2
        email: email,
      },
    ],
  });
  if (!user) {
    return res.status(404).json({
      message: "usernot found!",
    });
  }

  // const hash = crypto.createHash('sha256').update(password).digest('hex')
  // const isPasswordValid = hash === user.password

  //indono ko likhne ki wajah now we can do this
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid!",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);
  res.status(200).json({
    message: "user loggedIn Succesfully!",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

//api file main kabhi bhi logic nhi likhte means contoller wala part

module.exports = {
  registerController,
  loginController,
};
