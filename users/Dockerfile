FROM node:alpine
WORKDIR /users/src/app
COPY package*.json .
RUN npm ci
COPY . .
# CMD [ "npm","start" ]
CMD ["npm", "run","start"]