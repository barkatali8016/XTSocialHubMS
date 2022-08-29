FROM node:alpine
RUN npm install --global nodemon
WORKDIR /users/src/app
COPY package*.json .
RUN npm ci
COPY . .
# CMD [ "npm","start" ]
CMD ["npm", "run","start"]