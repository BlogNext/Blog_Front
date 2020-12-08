FROM node:14.2.0-stretch

RUN npm -v

#安装umi
RUN npm install -g umi@2.9.0

WORKDIR /app

COPY ./ /app