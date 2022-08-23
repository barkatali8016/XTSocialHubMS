const { ApplaudRepository } = require('../database');
const { FormatData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class ApplaudController {
  constructor() {
    this.repository = new ApplaudRepository();
  }
  async applaud({ postId, userId, applaudKey }) {
    try {
      const createdApplaud = await this.repository.createApplaud({
        postId,
        userId,
        applaudKey,
      });
      if (!createdApplaud) {
        return {};
      }
      console.log(createdApplaud);
      return FormatData({ id: createdApplaud._id });
    } catch (error) {
      throw error;
    }
  }

  async updateApplaud({ applaudId, userId, applaudKey }) {
    try {
      const updatedApplaud = await this.repository.updateApplaud({
        applaudId,
        userId,
        applaudKey,
      });
      console.log('here====');
      return FormatData({ id: updatedApplaud._id });
    } catch (error) {
      throw error;
    }
  }

  async deleteApplaud(id) {
    try {
      const deletedApplaud = await this.repository.deleteApplaud(id);
      if (!deletedApplaud) {
        return {};
      }
      return FormatData({ id: deletedApplaud._id });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ApplaudController;
