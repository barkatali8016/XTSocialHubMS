const { ApplaudRepository } = require('../database');
const { FormatData, APIError } = require('../utils');

class ApplaudController {
  constructor() {
    this.repository = new ApplaudRepository();
  }
  async applaud({ postId, userId, applaudId }) {
    try {
      const createdApplaud = await this.repository.createApplaud({
        postId,
        userId,
        applaudId,
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

  async deleteApplaud(id) {
    try {
      const deletedApplaud = await this.repository.deleteApplaud(id);
      if (!deletedApplaud) {
        return {};
      }
      return FormatData({ id: deletedApplaud._id });
    } catch (error) {}
  }
}
module.exports = ApplaudController;
