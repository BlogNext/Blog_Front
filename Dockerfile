FROM node:14.2.0-stretch

RUN yarn -v

RUN echo yarn -v

RUN npm i yarn  -g

RUN yarn -v

RUN yarn global add umi

RUN umi -v


WORKDIR /app

COPY ./ /app