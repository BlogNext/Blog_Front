FROM node:14.2.0-stretch

#镜像自带了yarn
RUN yarn -v

RUN yarn global add umi

RUN umi -v

RUN yarn global add umi-plugin-react --dev


WORKDIR /app

COPY ./ /app