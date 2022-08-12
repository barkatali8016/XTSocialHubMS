const express = require('express');
const cors = require('cors');
const { userRoutes } = require('./routes');
const HandleError = require('./utils/error-handler');
module.exports = async (app) => {
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  // LISTEN to EVENTS

  // Routes
  // userRoutes(app);

  //ERROR HANDLING
  app.use(HandleError);
};
