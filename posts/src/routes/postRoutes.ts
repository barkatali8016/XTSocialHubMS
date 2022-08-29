import { Express } from "express";
import { PostController } from "../controller";

import { CalculateReadingTime, PublishMessage } from "../utils";
import { configuration } from "../config";
import { multerInstance, PostsAuth } from "./middlewares";
import { MulterError } from "multer";

const { XTSOCIAL_BINDING_KEY } = configuration;

export const postRoutes = async (app: Express, channel: any) => {
  const postController = new PostController();
  app.post(
    "/api/post/create",
    PostsAuth,
    async (req: any, res: any, next: any) => {
      try {
        const { content } = req.body;
        const readingTime = CalculateReadingTime(content);
        req.body.readingTime = readingTime;
        const { _id } = req.user;
        req.body.userId = _id;
        const result = await postController.createNewPost(req.body);
        // console.log(result, "=================+");
        PublishMessage(
          channel,
          XTSOCIAL_BINDING_KEY,
          JSON.stringify({ event: "POST_CREATED", data: result })
        );
        res.statusCode = 201;
        res.send(result);
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );

  app.get("/api/post/list", PostsAuth, async (_, res, next) => {
    try {
      const result = await postController.getAllPosts();
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.get("/api/post/:id", PostsAuth, async (req, res, next) => {
    try {
      const result = await postController.getIndividualPost(req.params.id);
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.post("/api/post/image-upload", PostsAuth, function (req, res) {
    let message = "success";
    multerInstance(req, res, (err) => {
      if (!err) {
        res.statusCode = 200;
        return res.send({ message });
      }
      res.statusCode = 500;
      if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
        message = `Image size should be less than 2MB.`;
        return res.send({ message });
      }
      message = "Image should be of type png, jpg, jpeg and gif";
      res.send({ message });
    });
  });

  // THis is just a __private link__ for now for deleting the post
  app.delete("/api/post/:id", PostsAuth, async (req, res, next) => {
    try {
      const result = await postController.deleteIndividualPost(req.params.id);
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
};
