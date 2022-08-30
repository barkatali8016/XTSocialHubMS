const {
  UserRepository,
  PostRepository,
  CommentRepository,
  ApplaudRepository,
} = require('../database');
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();
    this.commentRepository = new CommentRepository();
    this.applaudRepository = new ApplaudRepository();
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

  async createComment(commentInputs) {
    try {
      return await this.commentRepository.CreateComment(commentInputs);
    } catch (error) {
      throw error;
    }
  }

  async updateComment(commentInputs) {
    try {
      return await this.commentRepository.UpdateComment(commentInputs);
    } catch (error) {
      throw error;
    }
  }

  async createApplaud(applaudInputs) {
    try {
      return await this.applaudRepository.createApplaud(applaudInputs);
    } catch (error) {
      throw error;
    }
  }

  async updateApplaud(applaudInputs) {
    try {
      return await this.applaudRepository.updateApplaud(applaudInputs);
    } catch (error) {
      throw error;
    }
  }

  async deleteApplaud(applaudInputs) {
    try {
      return await this.applaudRepository.deleteApplaud(applaudInputs);
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts() {
    try {
      return await this.postRepository.GetAllPosts();
    } catch (error) {
      throw error;
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = JSON.parse(payload);
    console.log('query payload=>', payload);
    switch (event) {
      case 'USER_CREATED':
        // UPDATE USER DB
        console.log(data.user, 'EVENT in Controller USER');
        this.createUser(data.user);
        break;
      case 'POST_CREATED':
        console.log(data, 'EVENT in Controller POST');
        this.createPost(data);
        break;
      case 'POST_DELETED':
      case 'POST_UPDATED':
        // UPDATE USER DB
        console.log(data, 'EVENT in Controller POST');
        break;
      case 'COMMENT_CREATED':
        console.log(data, 'EVENT in Controller COMMENT');
        this.createComment(data);
        break;
      case 'COMMENT_DELETED':
        console.log(data, 'EVENT in Controller');
        // this.updateComment(data);
        break;
      case 'COMMENT_UPDATED':
        console.log(data, 'EVENT in Controller');
        this.updateComment(data);
        break;

      case 'APPLAUD_CREATED':
        console.log(data, 'EVENT in Controller');
        this.createApplaud(data);
        break;

      case 'APPLAUD_UPDATED':
        console.log(data, 'EVENT in Controller');
        this.updateApplaud(data);
        break;

      case 'APPLAUD_DELETED':
        console.log(data, 'EVENT in Controller');
        this.deleteApplaud(data);
        break;
      default:
        break;
    }
  }
}
module.exports = UserController;
