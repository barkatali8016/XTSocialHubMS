import { Express } from "express";
import { PostController } from "../controller";
import { multerInstance } from "../utils";
import { MulterError, ErrorCode } from "multer";

export const postRoutes = async (app: Express) => {
  const postController = new PostController();
  app.post("/api/post/create", async (req, res, next) => {
    try {
      const result = await postController.createNewPost(req.body);
      res.statusCode = 201;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
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
    try {
      const result = await postController.getIndividualPost(req.params.id);
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.post("/image-upload", multerInstance, function (req, res) {
    res.send({ message: "success" });
  });
};
