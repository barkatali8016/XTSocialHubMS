const {
  UserRepository,
  PostRepository,
  CommentRepository,
  ApplaudRepository,
  SharePostRepository,
} = require('../database');
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();
    this.commentRepository = new CommentRepository();
    this.applaudRepository = new ApplaudRepository();
    this.sharePostRepo = new SharePostRepository();
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

  async deleteComment(commentInputs) {
    try {
      return await this.commentRepository.DeleteComment(commentInputs);
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

  async sharePost(shareInputs) {
    try {
      return await this.sharePostRepo.SharePost(shareInputs);
    } catch (error) {
      throw error;
    }
  }

  // FETCH POSTS
  async getAllPosts({ page, limit }) {
    try {
      return await this.postRepository.GetAllPosts({ page, limit });
    } catch (error) {
      throw error;
    }
  }

  async getAllPostsByUserId({ userId, page, limit }) {
    try {
      return await this.postRepository.GetAllPostsByUserId({
        userId,
        page,
        limit,
      });
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
        console.log(data, 'DELETE EVENT in Comments Controller');
        this.deleteComment(data);
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
      case 'POST_SHARED':
        console.log(data, 'EVENT in Controller SHARES');
        this.sharePost(data);
        break;
      default:
        break;
    }
  }
}
module.exports = UserController;
