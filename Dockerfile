FROM node:14.2.0

RUN npm -v

RUN npm install -g umi

WORKDIR /app

COPY ./ /app