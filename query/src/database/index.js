module.exports = {
  databaseConnection: require("./connection"),
  UserRepository: require("./repository/user-repository"),
  PostRepository: require("./repository/post-repository"),
  CommentRepository: require("./repository/comment-repository"),
  SharePostRepository: require("./repository/share-post-repository"),
};
