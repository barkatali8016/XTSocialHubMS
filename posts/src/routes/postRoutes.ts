import { Express } from "express";
import { PostController } from "../controller";
import { PublishMessage } from "../utils";
import { configuration } from "../config";
const { USER_BINDING_KEY } = configuration;
export const postRoutes = async (app: Express, channel: any) => {
  const postController = new PostController();
  app.post("/api/post/create", async (req, res, next) => {
    try {
      const result = await postController.createNewPost(req.body);

      PublishMessage(
        channel,
        USER_BINDING_KEY,
        JSON.stringify({ event: "POST_ADDED", data: { ...result } })
      );
      res.statusCode = 201;
      res.send(result);
    } catch (error) {
      throw error;
    }
  });

  app.get("/api/post/list", async (_, res, next) => {
    try {
      const result = await postController.getAllPosts();
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.get("/api/post/:id", async (req, res, next) => {
    // console.log(req.body);
    try {
      const result = await postController.getIndividualPost(req.params.id);
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
};
