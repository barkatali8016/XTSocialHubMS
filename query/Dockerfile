FROM node:alpine
WORKDIR /query/src/app
RUN npm install --global nodemon
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run","start"]