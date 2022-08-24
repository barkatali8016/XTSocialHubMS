const { ApplaudModel } = require('../models');
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require('../../utils/app-errors');
const mongoose = require('mongoose');

//Dealing with data base operations
class ApplaudRepository {
  async createApplaud({ postId, userId, applaudId }) {
    try {
      console.log(postId, userId, applaudId);
      const recordExist = await ApplaudModel.findOne({ postId, userId });
      if (recordExist) {
        return null;
      }
      const applaudModel = new ApplaudModel({
        postId,
        userId,
        applaudId,
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

  async deleteApplaud(id) {
    try {
      console.log(typeof id);
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
