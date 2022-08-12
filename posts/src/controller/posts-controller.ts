import { PostRepository } from "../database/repository";
import { IPost } from "../interface";

export class PostController {
    private repository: PostRepository;
    constructor() {
        this.repository = new PostRepository();
    }

    public async createNewPost(postInformation: IPost) {
        await this.repository.createPost(postInformation);
    }

    public async getAllPosts() {
        return this.repository.getAllPost();
    }

    public async getIndividualPost(userId: string) {
        return this.repository.getIndividualPost(userId);
    }
}