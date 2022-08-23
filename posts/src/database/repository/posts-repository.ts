import { IPost } from "../../interface";
import { postDBModel } from "../models";

export class PostRepository {
  public async createPost(postModel: IPost) {
    try {
      const post = new postDBModel(postModel);
      const result = await post.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
  public async getAllPost() {
    try {
      return await postDBModel.find({});
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  }
  public async getIndividualPost(postId: string) {
    try {
      const result = await postDBModel.findOne({ _id: postId });
      return result;
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  }
}
