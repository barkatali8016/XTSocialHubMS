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
      const recordExist = await ApplaudModel.findById(applaudInputs._id);

      if (recordExist) {
        return await ApplaudModel.findByIdAndUpdate(
          { _id: recordExist._id },
          {
            isDeleted: applaudInputs.isDeleted,
            applaudKey: applaudInputs.applaudKey,
          },
          { new: true }
        );
      } else {
        await applaudModel.save();
        return await PostModel.findOneAndUpdate(
          { _id: applaudInputs.postId },
          { $push: { applauds: applaudResult._id } }
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async updateApplaud(applaudInputs) {
    try {
      console.log('applaudInp', applaudInputs);
      const applaudResult = await ApplaudModel.findByIdAndUpdate(
        applaudInputs._id,
        {
          applaudKey: applaudInputs.applaudKey,
          isDeleted: applaudInputs.isDeleted,
        },
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
