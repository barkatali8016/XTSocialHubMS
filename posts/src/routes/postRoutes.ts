import { Express } from "express";
import { PostController } from "../controller";

import { CalculateReadingTime, PublishMessage, STATUS_CODES } from "../utils";
import { configuration } from "../config";
import { multerInstance, PostsAuth } from "./middlewares";
import { MulterError } from "multer";

const { USER_BINDING_KEY } = configuration;

export const postRoutes = async (app: Express, channel: any) => {
  const postController = new PostController();
  app.post("/api/post/create", PostsAuth, async (req, res, next) => {
    try {
      const { content } = req.body;
      const readingTime = CalculateReadingTime(content);
      req.body.readingTime = readingTime;
      const result = await postController.createNewPost(req.body);
      PublishMessage(
        channel,
        USER_BINDING_KEY,
        JSON.stringify({ event: "POST_ADDED", data: { ...result } })
      );
      res.status(STATUS_CODES.OK).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.get("/api/post/list", PostsAuth, async (_, res, next) => {
    try {
      const result = await postController.getAllPosts();
      res.status(STATUS_CODES.OK).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.get("/api/post/:id", PostsAuth, async (req, res, next) => {
    try {
      if (!req.params.id) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: 'Post ID is required',
        });
      }
      const result = await postController.getIndividualPost(req.params.id);
      res.status(STATUS_CODES.OK).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  app.post("/api/post/image-upload", (req, res) => {
    let message = 'success';
    if (!req.file) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: 'The request does not have an image',
      });
    }
    multerInstance(req, res, (err) => {
      if (!err) {
        return res.status(STATUS_CODES.OK).send({ message });
      }
      if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
        message = `Image size should be less than 2MB.`;
        return res.status(STATUS_CODES.INTERNAL_ERROR).send({ message });
      }
      message = 'Image should be of type png, jpg, jpeg and gif';
      res.status(STATUS_CODES.INTERNAL_ERROR).send({ message });
    });
  });

  // THis is just a __private link__ for now for deleting the post
  app.delete('/api/post/:id', PostsAuth, async (req, res, next) => {
    try {
      if (!req.params.id) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: 'Post ID is required',
        });
      }
      const result = await postController.deleteIndividualPost(req.params.id);
      res.status(STATUS_CODES.OK).send(result);
    } catch (error) {
      console.log(error);
      next(error)
    }
  });
};
