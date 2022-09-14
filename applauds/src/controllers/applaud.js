const { ApplaudRepository } = require('../database');
const { FormatData } = require('../utils');
const {
  APIError,
  STATUS_CODES,
  BadRequestError,
} = require('../utils/app-errors');

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
        throw new BadRequestError(
          'Data already exist',
          STATUS_CODES.BAD_REQUEST
        );
      }
      return FormatData(createdApplaud);
    } catch (error) {
      throw error;
    }
  }

  async updateApplaud({ applaudId, applaudKey, userId }) {
    try {
      const updatedApplaud = await this.repository.updateApplaud({
        applaudId,
        applaudKey,
        userId,
      });
      return FormatData(updatedApplaud);
    } catch (error) {
      throw error;
    }
  }

  async deleteApplaud(id, userId) {
    try {
      const deletedApplaud = await this.repository.deleteApplaud(id, userId);
      return FormatData(deletedApplaud);
    } catch (error) {
      throw error;
    }
  }
  async getApplaud(id) {
    try {
      const getApplaud = await this.repository.getApplaud(id);
      if (getApplaud.length == 0) {
        throw new APIError(
          'Data Not found',
          STATUS_CODES.NOT_FOUND,
          'data not found'
        );
      }
      return getApplaud;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ApplaudController;
