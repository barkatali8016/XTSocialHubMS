const swaggerAutogen = require("swagger-autogen")();

const path = require("path");

const outputFile = path.resolve(__dirname, "./users-swagger.json");
const endpointsFiles = [path.resolve(__dirname, "./routes/user.js")];

swaggerAutogen(outputFile, endpointsFiles);
