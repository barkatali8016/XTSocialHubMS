FROM node:16.14.1
WORKDIR /users/src/app
COPY package*.json .
RUN npm ci
COPY . .
# CMD [ "npm","start" ]
CMD ["npm", "run","start"]