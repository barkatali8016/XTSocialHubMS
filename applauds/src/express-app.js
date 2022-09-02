const express = require('express');
const cors = require('cors');
const { applaudRoutes } = require('./routes');
const HandleError = require('./utils/error-handler');
const Auth = require('./middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
module.exports = async (app, channel) => {
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));
  app.use('/applaud-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.use(Auth);
  // LISTEN to EVENTS

  // Routes
  applaudRoutes(app, channel);

  //ERROR HANDLING
  app.use(HandleError);
};
