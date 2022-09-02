const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require(path.resolve(__dirname, '../shares-swagger.json'));
const HandleError = require('./utils/error-handler');
const Auth = require('./middleware/auth');
const share_post_router = require('./routes/share-post-route');
const share_count_router = require('./routes/share-count');
const shared_users_router = require('./routes/shared-users');

module.exports = async (app, channel) => {
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));
  app.use(Auth);
  app.use('/shares-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // LISTEN to EVENTS

  // Passing channel as via middleware 
  const channelMiddleware = (req, res, next)=>{
    req.channel = channel;
    next();
  }
  app.use(channelMiddleware);

  // Routes
  app.use([share_post_router, share_count_router, shared_users_router]);

  //ERROR HANDLING
  app.use(HandleError);
};
