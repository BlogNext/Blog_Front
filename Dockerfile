FROM node:14.2.0

RUN npm -v

RUN yarn global add umi

RUN umi -v

WORKDIR /app

COPY ./ /app