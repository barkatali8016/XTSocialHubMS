FROM node:alpine
WORKDIR /posts/src/app
RUN npm install --global nodemon
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run","start:nodemon"]