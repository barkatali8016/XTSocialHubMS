const { UserRepository, PostRepository } = require("../database");
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();
  }
  async createUser(userInputs) {
    try {
      return await this.userRepository.CreateUser(userInputs);
    } catch (error) {
      throw error;
    }
  }
  async createPost(postInputs) {
    try {
      return await this.postRepository.CreatePost(postInputs);
    } catch (error) {
      throw error;
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = JSON.parse(payload);

    switch (event) {
      case "USER_CREATED":
        // UPDATE USER DB
        console.log(data.user, "EVENT in Controller USER");
        this.createUser(data.user);
        break;
      case "POST_CREATED":
        console.log(data, "EVENT in Controller POST");
        this.createPost(data);
        break;
      case "POST_DELETED":
      case "POST_UPDATED":
        // UPDATE USER DB
        console.log(event, "EVENT in Controller POST");
        break;
      case "COMMENT_ADDED":
      case "COMMENT_DELETED":
      case "COMMENT_UPDATED":
        // UPDATE USER DB
        console.log(event, "EVENT in Controller");
        break;
      default:
        break;
    }
  }
}
module.exports = UserController;
