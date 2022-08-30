const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require('../../utils/app-errors');
const mongoose = require('mongoose');
const { ApplaudModel, PostModel } = require('../models');

//Dealing with data base operations
class ApplaudRepository {
  async createApplaud(applaudInputs) {
    try {
      console.log('applaudInp', applaudInputs);
      const applaudModel = new ApplaudModel(applaudInputs);
      const applaudResult = await applaudModel.save();
      await PostModel.findOneAndUpdate(
        { _id: applaudInputs.postId },
        { $push: { applauds: applaudResult._id } }
      );
      return applaudResult;
    } catch (err) {
      throw err;
    }
  }

  async updateApplaud(applaudInputs) {
    try {
      console.log('applaudInp', applaudInputs);
      const applaudResult = await ApplaudModel.findByIdAndUpdate(
        applaudInputs._id,
        { applaudKey: applaudInputs.applaudKey },
        {
          new: true,
        }
      );
      return applaudResult;
    } catch (err) {
      throw err;
    }
  }

  async deleteApplaud(applaudInputs) {
    try {
      const deleted = await ApplaudModel.findByIdAndUpdate(
        applaudInputs._id,
        {
          isDeleted: applaudInputs.isDeleted,
        },
        {
          new: true,
        }
      );
      return deleted;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = ApplaudRepository;
