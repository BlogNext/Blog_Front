FROM node:10.13

RUN npm -v

RUN npm i tyarn -g

RUN tyarn -v


WORKDIR /app

COPY ./ /app