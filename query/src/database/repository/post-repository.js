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


  async GetAllPosts() {
    try {
      const allPosts = await PostModel.find().populate('userId').populate({
        path: 'comments',
        model: 'comments',
        populate: {
          path: 'userId',
          model: 'users',
        },
      }).populate({
        path: 'shareId',
        model: 'shares',
          populate: {
            path: 'shareDetails.userId',
            model: 'users',
          },
      });

      return allPosts;
    } catch (error) {
      throw error;
    }
  }
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
