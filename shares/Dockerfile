FROM node:alpine

WORKDIR /shares/src/app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]