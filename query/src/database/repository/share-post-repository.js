const { ShareModel, PostModel } = require("../models");

//Dealing with data base operations
class SharePostRepository {
    async SharePost(shareInputs) {
        try {
            const share = new ShareModel(shareInputs);
            const shareResult = await ShareModel.findOneAndUpdate(
                { _id: shareInputs._id },
                share,
                { upsert: true, new: true },
            );
            if (shareResult.shareCount === 1) {
                await PostModel.findOneAndUpdate({ _id: shareResult.postId }, { $set: { shares: shareResult._id }, });
            }
            return shareResult;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SharePostRepository;
