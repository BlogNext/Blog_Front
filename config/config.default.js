/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-28 16:38:09
 * @LastEditros: 
 * @LastEditTime: 2021-06-14 14:44:48
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
  }

  config.proxy = true;

  config.security = {
    csrf: false,
    xframe: {
      enable: false,
    },
  };

  return config;
};
