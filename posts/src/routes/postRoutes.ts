/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from "express";
import { PostController } from "../controller";

import { CalculateReadingTime, PublishMessage, STATUS_CODES } from "../utils";
import { configuration } from "../config";
import { multerInstance, PostsAuth } from "./middlewares";
import { MulterError } from "multer";

import { scheduleJob } from 'node-schedule';

const { XTSOCIAL_BINDING_KEY } = configuration;

// code to add 30 seconds to the current time for scheduling
// let date  = new Date();
// date.setSeconds(date.getSeconds() + 30);
// console.log(date)

const createPost = async (content: string, channel: any, req: any, postController: any) => {
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
  return result;
}

export const postRoutes = async (app: Express, channel: any) => {
  const postController = new PostController();
  app.post("/api/post/create", PostsAuth, async (req: any, res: any, next: any) => {
    try {
      const { content, imageURL, schedule } = req.body;
      if (!content && !imageURL) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: 'Either post content or Image URL is required',
        });
      }
      if (schedule && schedule.time) {
        const job = scheduleJob(schedule.date, function () {
          createPost(content, channel, req, postController)
          job.cancel();
        });
      }
      const result = await createPost(content, channel, req, postController);
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

  app.post("/api/post/image-upload", PostsAuth, (req, res) => {
    let message = 'success';
    multerInstance(req, res, (err) => {
      if (!err) {
        console.log(req.file);
        return res.status(STATUS_CODES.OK).send({ message, imageURL: `images/${req.file?.filename}` });
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
  app.delete("/api/post/:id", PostsAuth, async (req, res, next) => {
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
      next(error);
    }
  });
};
