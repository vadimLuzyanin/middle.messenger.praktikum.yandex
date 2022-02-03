FROM node:alpine

WORKDIR /opt/web
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN yarn build

CMD node server.js