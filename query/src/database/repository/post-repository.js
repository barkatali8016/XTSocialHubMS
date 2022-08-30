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

  async GetAllPosts(data) {
    const page = parseInt(data.page);
    const limit = parseInt(data.limit);
    const userId = data.userId;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const totalPosts = await PostModel.find({ userId })
      .estimatedDocumentCount()
      .exec();
    results.totalPosts = totalPosts;
    if (endIndex < totalPosts) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.posts = await PostModel.find()
        .limit(limit)
        .skip(startIndex)
        .populate("userId")
        .populate({
          path: "comments",
          model: "comments",
          populate: {
            path: "userId",
            model: "users",
          },
        });

      return results;
    } catch (error) {
      throw error;
    }
  }

  async GetAllPostsByUserId(data) {
    const page = parseInt(data.page);
    const limit = parseInt(data.limit);
    const userId = data.userId;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const totalPosts = await PostModel.find({ userId })
      .estimatedDocumentCount()
      .exec();
    results.totalPosts = totalPosts;

    if (endIndex < totalPosts) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.posts = await PostModel.find({ userId })
        .limit(limit)
        .skip(startIndex)
        .populate("userId")
        .populate({
          path: "comments",
          model: "comments",
          populate: {
            path: "userId",
            model: "users",
          },
        })
        .exec();
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostRepository;
