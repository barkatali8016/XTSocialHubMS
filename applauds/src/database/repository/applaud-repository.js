const { ApplaudModel } = require('../models');
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require('../../utils/app-errors');

//Dealing with data base operations
class ApplaudRepository {
  async createApplaud({ postId, userId, salt }) {
    try {
      const recordExist = await ApplaudModel.findOne({ postId, userId });
      if (recordExist) {
        return null;
      }
      const applaud = new ApplaudModel({
        postId,
        userId,
        salt,
      });
      const applaudResult = await applaud.save();
      return applaudResult;
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Applaud'
      );
    }
  }

  // async FindUser({ email }) {
  //   try {
  //     const user = await UserModel.findOne({ email });
  //     return user;
  //   } catch (error) {
  //     throw new APIError(
  //       'API Error',
  //       STATUS_CODES.INTERNAL_ERROR,
  //       'Unable to Create Customer'
  //     );
  //   }
  // }
}

module.exports = ApplaudRepository;
