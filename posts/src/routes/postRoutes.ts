import { Express } from "express";
import { PostController } from "../controller";

import { CalculateReadingTime, PublishMessage } from "../utils";
import { configuration } from "../config";
import { multerInstance, PostsAuth } from "./middlewares";
import { MulterError } from "multer";

const { XTSOCIAL_BINDING_KEY } = configuration;

export const postRoutes = async (app: Express, channel: any) => {
  const postController = new PostController();
  /*****
   * CREATE POST
   * @body
   */
  app.post("/create", PostsAuth, async (req: any, res: any, next: any) => {
    try {
      const { content } = req.body;
      const readingTime = CalculateReadingTime(content);
      req.body.approxReadingTime = readingTime;
      const { _id } = req.user;
      req.body.userId = _id;
      const result = await postController.createNewPost(req.body);
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
  });
  /*****
   * FETCH ALL POST
   *
   */
  app.get("/list", PostsAuth, async (_, res, next) => {
    try {
      const result = await postController.getAllPosts();
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  /*****
   * FETCH POST BY ID
   * @param id
   */
  app.get("/fetch/:id", PostsAuth, async (req, res, next) => {
    try {
      const result = await postController.getIndividualPost(req.params.id);
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  /*****
   * UPLOAD IMAGE FOR POST
   * @body
   */
  app.post("/image-upload", PostsAuth, function (req, res) {
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
  /*****
   * DELETE POST BY ID
   * @param id
   */
  app.delete("/delete/:id", PostsAuth, async (req, res, next) => {
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
