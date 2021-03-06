FROM node:14.2.0-stretch

RUN npm -v

# 切换淘宝镜像，解决国内npm安装太慢
RUN npm config set registry https://registry.npm.taobao.org

# 官方镜像
# RUN npm config set registry https://registry.npmjs.org/

#安装umi
RUN npm install -g umi@3.4.19
RUN echo success

WORKDIR /app

COPY ./ /app