const express = require ('express')
const cookieParser = require("cookie-parser")
const userModel= require('../models/user.model')
//jis folder main file hai us folder ko chhod ke doosre folder se require kr rhe to 
//double dot use krna hai

// src/
// │
// ├── models/
// │   └── user.model.js
// │
// └── controllers/
//     └── user.controller.js

const jwt = require("jsonwebtoken")
//Token create user ke liye , user data ke sth 
//Each token signature with a secret JWT_SECRET , yeh jwt secret hr server ka alh alg hota hai
//JWT secret generate kra skte jwt secret website se


const authRouter =  express.Router()

//abhi tumhari api sever keliye exist nhi krti abhi tumne isse app.js main nhi import kiay
//jab tumne postman pe http://localhost:3000/register krna to not found 404 aya
//becoz server ko pta hi nhi yeh route exist bhi krta so ab isse app.js main import krnge and then

/**
 * /api/auth/register iss poori format ko follow krte hue agr req kroge tb sucessfully req hogi
 */

authRouter.post('/register',async(req,res)=>{
    const {name , email , password}=req.body;

    const isUserAlreadyExists = await userModel.findOne({ email })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exist with this email"
        })
    }

    const user = await userModel.create({
        name, email , password
    })

    const token = jwt.sign({
        id:user._id
    },
    //email rkhna chho to rkh skte hai
    process.env.JWT_SECRET
    )
    //yahan user data ke liye only id dete hai

    res.cookie("jwt_token",token)
    //ab server token create krne ke baad ise client ki cookie main store kr dega

    res.status(201).json({
        message:"user Registered!",
        user,
        token
    })
    //user ka data aur jwt secret se milke token bnata 
    //if you want to verify ki jwt token main user ka data ahai yeh nhi then you can visit jwt.io

    //ab jab bhi user register hone ke bad kuch bhirrequest krega to yeh token jaega server pe
    //yeh krne ke liye kaam ati storages
})

module.exports =authRouter;