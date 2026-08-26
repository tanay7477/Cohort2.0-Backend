const express = require("express")

const followModel = require('../models/follow.model')

async function followUserController(req,res){
const followerUsername = req.user.username
const followeeUsername = req.params.username

if(followeeUsername == followerUsername){
    return res.status(400).json({
        message:"you can not follow yourself"
    })
}

//check
const ifFolloweeExist = await followModel.findOne({
    username : followeeUsername
})
if(!isFolloweeExist){
    return res.status(404).json({
        message : " User you are trying to follow doesnot exist"
    })
}

const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee : followeeUsername
})
 if(isAlreadyFollowing){//check
    return res.status(200).json({//its depends on devloper to give just message or error here
        message : `you are already following ${followeeUsername}`,
        follow : isAlreadyFollowing

    })
 }

const followRecord = await followModel.create({
    follower: followerUsername,
    followee:followeeUsername
})

res.status(201).json({
    message: `you are now following ${followeeUsername}`,
    follow : followRecord
})
}

async function unfollowUserContoller(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message : `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)
    res.status(200).json({
        message : `you have unfollowed ${followeeUsername}`

    })

}

module.exports = {
    followUserController,
    unfollowUserContoller
}