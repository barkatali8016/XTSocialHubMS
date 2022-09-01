const { SharePostModel } = require('../models');

//Performing DB operations
class SharePostRepository {
    async sharepost({ postId, userId }) {
        try {
            const alreadySharedPost = await SharePostModel.findOneAndUpdate(
                { postId },
                {
                    $push: { shareDetails: { userId, sharedTime: new Date() } },
                    $inc: { shareCount: 1 }
                },
                { new: true },
            );
            if (alreadySharedPost) {
                return alreadySharedPost;
            } else {
                const shareModel = new SharePostModel({
                    postId,
                    shareDetails: [{ userId, sharedTime: new Date() }],
                    shareCount: 1,
                });
                const shareResult = await shareModel.save();
                return shareResult;
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SharePostRepository;
