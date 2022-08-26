const express = require('express');
const cors = require('cors');
const HandleError = require('./utils/error-handler');
const Auth = require('./middleware/auth');
const share_post_router = require('./routes/share-post-route');
const share_count_router = require('./routes/share-count');
const shared_users_router = require('./routes/shared-users');

module.exports = async (app) => {
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));
  app.use(Auth);
  // LISTEN to EVENTS

  // Routes
  app.use([share_post_router, share_count_router, shared_users_router]);

  //ERROR HANDLING
  app.use(HandleError);
};
