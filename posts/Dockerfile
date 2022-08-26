FROM node:alpine
WORKDIR /posts/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run","start:nodemon"]