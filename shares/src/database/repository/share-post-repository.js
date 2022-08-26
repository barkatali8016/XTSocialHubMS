const { SharePostModel } = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

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
                { returnNewDocument: true },
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
            throw new APIError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                'Post sharing failed.'
            );
        }
    }

    async savingIntoDB(data) {

    }
}

module.exports = SharePostRepository;
