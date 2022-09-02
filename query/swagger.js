const swaggerAutogen = require("swagger-autogen")();

const path = require("path");

const outputFile = path.resolve(__dirname, "../shares-swagger.json");
const endpointsFiles = [
  path.resolve(__dirname, "./routes/share-count.js"),
  path.resolve(__dirname, "./routes/share-post-route.js"),
  path.resolve(__dirname, "./routes/shared-users.js"),
];

swaggerAutogen(outputFile, endpointsFiles);
