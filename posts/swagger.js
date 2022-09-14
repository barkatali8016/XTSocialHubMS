
const swaggerAutogen = require('swagger-autogen')()
const path = require('path')

const outputFile = path.resolve(__dirname, './posts-swagger.json');
const endpointsFiles = [path.resolve(__dirname, './dist/routes/postRoutes.js')];

swaggerAutogen(outputFile, endpointsFiles);