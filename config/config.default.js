/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-28 16:38:09
 * @LastEditros: 
 * @LastEditTime: 2021-06-17 16:18:18
 */
'use strict';
const path = require('path');
const fs = require('fs');
module.exports = (appInfo, appConfig = {}) => {
  const assetsDir =
    (appConfig.assets && appConfig.assets.assetsDir) || 'app/web';
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'LauighingZhu_Blog';

  // add your config here
  config.middleware = [];

  config.assets = {
    publicPath: '/public',
    devServer: {
      command: 'umi dev',
      env: {
        APP_ROOT: path.join(appInfo.baseDir, assetsDir),
        PORT: '{port}',
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:{port}',
        PUBLIC_PATH: 'http://127.0.0.1:{port}',
      },
    },
  };

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
  };
  config.setFile = {
    '/favicon.ico': `${appConfig.assets}favicon.png`,
    // '/sitemap.xml': fs.readFileSync(path.join(__dirname, '/app/public/sitemap.xml')),
    '/robots.txt': fs.readFileSync(path.join(__dirname, '/robots.txt')),

  }

  config.proxy = true;

  config.security = {
    csrf: false,
    xframe: {
      enable: false,
    },
  };
  config.customLogger = {
    scheduleLogger: {
      consoleLevel: 'NONE',
      file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    },
  };

  return config;
};
