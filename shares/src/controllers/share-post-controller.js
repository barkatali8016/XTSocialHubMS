const { SharePostRepository } = require('../database');
const { FormatData, APIError } = require('../utils');

class SharePostController {
    constructor() {
        this.repository = new SharePostRepository();
    }
    async share({ postId, userId, applaudId }) {
        try {
            const sharePost = await this.repository.sharepost({
                postId,
                userId,
            });
            if (!sharePost) {
                return {};
            }
            return FormatData({ id: sharePost._id });
        } catch (error) {
            throw new APIError('Data Not found', error);
        }
    }
}

module.exports = SharePostController;
