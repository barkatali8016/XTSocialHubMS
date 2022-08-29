FROM node:alpine
WORKDIR /applauds/src/app
RUN npm install --global nodemon
COPY package*.json .
RUN npm ci
COPY . .
# CMD [ "npm","start" ]
CMD ["npm", "run","start"]
