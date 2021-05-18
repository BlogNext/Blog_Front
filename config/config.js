// import pxToViewPort from 'postcss-px-to-viewport';
const config = {
  routes: [
    

    {
      path: '/admin',
      component: '../layouts/AdminLayout',
      routes: [
        {
          path: '/admin',
          component: './admin/login',
          // redirect: '/admin/login'
        },
        {
          path: '/admin/login',
          component: './admin/login'
        },
        // {
        //   path: '/admin/edit',
        //   component: './admin/edit'
        // }
      ]
    },
    {
      path: '/detail',
      component: '../layouts/DetailLayout',
      routes: [
        {
          path: '/detail',
          component: './detail',
        },
      ]
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        
        {
          path: '/',
          component: './index',
        },
        {
          path: '/index',
          redirect: '/',
          component: './index',
        },
        
      ],
      
    },
  ],
  dva: {},
  antd: {},
  dynamicImport: {},
  title: `LaughingZhu's Blog`,
  proxy: {
    '/common': {
      target: 'http://laughingzhu.cn:8083/common',
      changeOrigin: true,
      pathRewrite: {
        '^/common': '',
      },
      secure: false,
    },
    // '/front': {
    //   target: 'http://blog.laughingzhu.com/front',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/front': '',
    //   },
    //   secure: false,
    // },
  },
  // extraPostCSSPlugins: [
  //   pxToViewPort({
  //     viewportWidth: 750,
  //     viewportHeight: 1334,
  //     unitPrecision: 5,
  //     viewportUnit: 'vw',
  //     selectorBlackList: [],
  //     minPixelValue: 1,
  //     mediaQuery: false,
  //   }),
  // ],
  publicPath: './',
  fastRefresh: {},
  favicon: '/assets/favicon.ico',
  base: '/',
  // 兼容ie9
  // targets: {
  //   ie: 9,
  // },
  hash: true,
  history: {
    type: 'browser'
  },
  runtimePublicPath: true,
  chainWebpack: function(config, { webpack }) {
    // 删除 umi 内置插件
    config.merge({
        optimization: {
            minimize: true,
            splitChunks: {
                // chunks: 'async', 
                // minSize: 20000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
                // minChunks: 2, //最小使用到次数，超过2次执行
                // automaticNameDelimiter: '.', //连接符
                cacheGroups: {
                  vendor: {
                    // chunks: 'ini',
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                      const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                      // 避免服务端不支持@
                      return `npm.${packageName.replace('@', '')}`;
                    },
                  },
                    
                    // 'antd': {
                    //   // 异步加载echarts包
                    //   name: 'antd',
                    //   test: /^.*node_modules[\\/](?!antd).*$/,
                    //   chunks: 'all',
                    //   priority: 10, // 高于async-commons优先级
                    // },
                    // 'quill': {
                    //   // 异步加载echarts包
                    //   name: 'quill',
                    //   test: /^.*node_modules[\\/](?!quill|quill-emoji).*$/,
                    //   chunks: 'all',
                    //   priority: 10, // 高于async-commons优先级
                    // },
                    // 'highlight': {
                    //   // 异步加载echarts包
                    //   name: 'highlight',
                    //   test: /^.*node_modules[\\/](?!highlight).*$/,
                    //   chunks: 'all',
                    //   priority: 10, // 高于async-commons优先级
                    // },
                    // 'async-commons': {
                    //     // 其余异步加载包
                    //     chunks: 'async',
                    //     minChunks: 2,
                    //     name: 'async-commons',
                    //     priority: 9,
                    // },
                    // commons: {
                    //     // 其余同步加载包
                    //     chunks: 'all',
                    //     minChunks: 2,
                    //     name: 'commons',
                    //     priority: 8,
                    // },
                },
            },
        },
    });
    //过滤掉momnet的那些不使用的国际化文件
    config
        .plugin('replace')
        .use(require('webpack').ContextReplacementPlugin)
        .tap(() => {
            return [/moment[/\\]locale$/, /zh-cn/];
    });
  },
};
export default config;

