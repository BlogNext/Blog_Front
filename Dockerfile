FROM node:14.2.0-stretch

RUN npm -v

#安装umi

WORKDIR /app

COPY ./ /app