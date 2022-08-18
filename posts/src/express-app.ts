import express, { json, urlencoded, Express } from "express";
import cors from "cors";
import { postRoutes } from "./routes";
export default async (app: Express, channel: any) => {
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // Routes
  postRoutes(app, channel);

  //ERROR HANDLING
  //   app.use(HandleError);
};
