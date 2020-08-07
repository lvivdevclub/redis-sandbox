FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

ENV DEBUG='ioredis:*'

CMD [ "node", "ioredis/index.js" ]
