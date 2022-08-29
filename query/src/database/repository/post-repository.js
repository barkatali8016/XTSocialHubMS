const { PostModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class PostRepository {
  async CreatePost(postInputs) {
    try {
      const post = new PostModel(postInputs);
      const postResult = await post.save();
      return postResult;
    } catch (err) {
      throw err;
    }
  }

  // async FindUser({ email }) {
  //   try {
  //     const user = await UserModel.findOne({ email });
  //     return user;
  //   } catch (error) {
  //     throw new APIError(
  //       "API Error",
  //       STATUS_CODES.INTERNAL_ERROR,
  //       "Unable to Create Customer"
  //     );
  //   }
  // }
  // async FindUserById({ _id }) {
  //   try {
  //     const user = await UserModel.findOne({ _id });
  //     return user;
  //   } catch (error) {
  //     throw new APIError(
  //       "API Error",
  //       STATUS_CODES.INTERNAL_ERROR,
  //       "Unable to Create Customer"
  //     );
  //   }
  // }
}

module.exports = PostRepository;
