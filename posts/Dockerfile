FROM node:16.14.1
WORKDIR /posts/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run","start:nodemon"]