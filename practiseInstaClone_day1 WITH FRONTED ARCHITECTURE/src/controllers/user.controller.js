const followModel = require('../model/follow.model')
const userModel = require('../model/user.model')

async function followUserController(req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username;

        if (followeeUsername === followerUsername) {
            return res.status(400).json({
                message: "dekh nashedi ko khud ko hi follow krne ki try kr rha , not possible check lga hai"
            });
        }

        const isFolloweeExist = await userModel.findOne({ username: followeeUsername });
        if (!isFolloweeExist) {
            return res.status(404).json({
                message: `no bhadwa exist with this username : ${followeeUsername}`
            });
        }

        const isAlreadyFollowing = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
        });
        if (isAlreadyFollowing) {
            return res.status(409).json({
                message: "Bhadwe ek bar follow krke man nhi bhra"
            });
        }

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        });

        return res.status(201).json({
            message: `you are now following ${followeeUsername}`,
            followRecord
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function unfollowUserController(req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username;

        const isUserFollowing_delete = await followModel.findOneAndDelete({
            follower: followerUsername,
            followee: followeeUsername
        });

        if (isUserFollowing_delete) {
            return res.status(200).json({
                message: `you unfollowed ${followeeUsername}`
            });
        }

        return res.status(404).json({
            message: "Gaddari karwe,follow kr hi nhi rha usse"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function followReqAcceptorRejectController(req, res) {
    try {
        const followeeUsername = req.user.username;
        const followerUsername = req.params.username;

        const isFollowerExist = await userModel.findOne({ username: followerUsername });
        if (!isFollowerExist) {
            return res.status(404).json({
                message: `no bhadwa exist with this username : ${followerUsername}`
            });
        }

        const checkFollowStatus = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        });

        if (!checkFollowStatus) {
            return res.status(404).json({
                message: "koi follow request exist hi nahi karti"
            });
        }

        if (checkFollowStatus.status !== "pending") {
            return res.status(400).json({ message: "Request already handled" });
        }

        checkFollowStatus.status = "accepted";
        await checkFollowStatus.save();

        return res.status(200).json({
            message: "Follow request accepted",
            checkFollowStatus
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    followUserController,
    unfollowUserController,
    followReqAcceptorRejectController
}