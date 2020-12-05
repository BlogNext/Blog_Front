FROM node:14.2.0-stretch

RUN npm -v

RUN npm install -g umi

WORKDIR /app

COPY ./ /app