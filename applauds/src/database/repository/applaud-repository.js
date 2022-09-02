const { ApplaudModel } = require('../models');
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require('../../utils/app-errors');
const mongoose = require('mongoose');

//Dealing with data base operations
class ApplaudRepository {
  async createApplaud({ postId, userId, applaudKey }) {
    try {
      const recordExist = await ApplaudModel.findOne({ postId, userId });
      const applaudModel = new ApplaudModel({
        postId,
        userId,
        applaudKey,
      });
      if (recordExist) {
        if (!recordExist.isDeleted) {
          return null;
        } else {
          console.log('here', recordExist);
          return await ApplaudModel.findByIdAndUpdate(
            { _id: recordExist._id },
            { isDeleted: false, applaudKey },
            { new: true }
          );
        }
      } else {
        return await applaudModel.save();
      }
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Applaudas'
      );
    }
  }

  async updateApplaud({ applaudId, applaudKey, userId }) {
    try {
      if (!mongoose.Types.ObjectId.isValid(applaudId)) {
        throw new BadRequestError('Invalid Applaud ID');
      }
      const applaudResult = await ApplaudModel.findOneAndUpdate(
        { _id: applaudId, userId },
        { applaudKey, isDeleted: false },
        {
          new: true,
        }
      );
      if (!applaudResult) {
        throw new BadRequestError(
          'Applaud does not exist for the user',
          STATUS_CODES.NOT_FOUND
        );
      }
      return applaudResult;
    } catch (err) {
      throw err;
    }
  }

  async deleteApplaud(id, userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestError('Invalid Applaud ID');
      }
      console.log(userId);
      const deleted = await ApplaudModel.findOneAndUpdate(
        { _id: id, userId },
        {
          isDeleted: true,
        },
        {
          new: true,
        }
      );
      if (!deleted) {
        throw new BadRequestError(
          'Applaud does not exist for the user',
          STATUS_CODES.NOT_FOUND
        );
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async getApplaud(id) {
    try {
      const data = await ApplaudModel.find({ postId: id, isDeleted: false });
      return data;
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to fetch applaud'
      );
    }
  }
}

module.exports = ApplaudRepository;
