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
      console.log(postId, userId, applaudKey);
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

  async updateApplaud({ applaudId, userId, applaudKey }) {
    try {
      if (!mongoose.Types.ObjectId.isValid(applaudId)) {
        console.log('INVALID');
        throw new BadRequestError('Invalid Applaud ID');
      }
      const applaudResult = await ApplaudModel.findOneAndUpdate(
        { _id: applaudId },
        { applaudKey },
        {
          new: true,
        }
      );
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
      const deleted = await ApplaudModel.findByIdAndDelete(id);
      console.log('deleted', deleted);
      return deleted;
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Delete Applaud'
      );
    }
  }
  async getApplaud(id) {
    try {
      console.log("rep",id);
      const data = await ApplaudModel.find({postId:id});
      console.log('data', data);
      return data;
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Delete Applaud'
      );
    }
  }
}

module.exports = ApplaudRepository;
