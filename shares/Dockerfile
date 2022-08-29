FROM node:alpine

WORKDIR /shares/src/app

RUN npm install --global nodemon

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]