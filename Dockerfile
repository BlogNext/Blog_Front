FROM node:14.2.0-stretch

RUN npm i umi -g

WORKDIR /app

COPY ./ /app