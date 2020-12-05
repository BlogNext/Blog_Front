FROM node:14.2.0-stretch

RUN npm -v

#安装umi
RUN yarn global add umi
RUN umi -v

WORKDIR /app

COPY ./ /app