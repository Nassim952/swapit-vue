# develop stage
FROM node:lts-alpine as develop-stage

WORKDIR /usr/src/app/Swapit-Vue

COPY package*.json ./

RUN yarn install

CMD ["sh", "-c", "yarn install; yarn serve"]
