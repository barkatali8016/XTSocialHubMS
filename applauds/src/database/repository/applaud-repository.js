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
      if (recordExist) {
        return null;
      }
      const applaudModel = new ApplaudModel({
        postId,
        userId,
        applaudKey,
      });
      const applaudResult = await applaudModel.save();
      return applaudResult;
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Applaud'
      );
    }
  }

  async updateApplaud({ applaudId, applaudKey }) {
    try {
      if (!mongoose.Types.ObjectId.isValid(applaudId)) {
        throw new BadRequestError('Invalid Applaud ID');
      }
      const applaudResult = await ApplaudModel.findByIdAndUpdate(
        applaudId,
        { applaudKey },
        {
          new: true,
        }
      );
      console.log(applaudResult);
      if (!applaudResult) {
        throw new BadRequestError(
          'Applaud ID does not exist',
          STATUS_CODES.NOT_FOUND
        );
      }
      return applaudResult;
    } catch (err) {
      throw err;
    }
  }

  async deleteApplaud(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestError('Invalid Applaud ID');
      }
      const deleted = await ApplaudModel.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
        },
        {
          new: true,
        }
      );
      if (!deleted) {
        throw new BadRequestError(
          'Applaud ID does not exist',
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
