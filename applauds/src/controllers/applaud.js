const { ApplaudRepository } = require('../database');
const { FormatData, APIError } = require('../utils');

class ApplaudController {
  constructor() {
    this.repository = new ApplaudRepository();
  }
  async applaud({ postId, userId, applaud }) {
    try {
      const createdApplaud = await this.repository.createApplaud({
        postId,
        userId,
        applaud,
      });
      if (!createdApplaud) {
        return {};
      }
      console.log(createdApplaud);
      return FormatData({ id: createdApplaud._id });
    } catch (error) {
      throw new APIError('Data Not found', error);
    }
  }
}
module.exports = ApplaudController;
