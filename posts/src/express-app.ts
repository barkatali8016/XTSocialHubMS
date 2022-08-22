import express, {json, urlencoded, Express} from 'express';
import cors from "cors";
import { postRoutes } from './routes';
export default async (app: Express) => {
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));
  app.use('/asset/images', express.static('images'));

  // Added comment

  // LISTEN to EVENTS

  // Routes
  postRoutes(app);

  //ERROR HANDLING
//   app.use(HandleError);
};
