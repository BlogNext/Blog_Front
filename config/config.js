// import pxToViewPort from 'postcss-px-to-viewport';
const config = {
  treeShaking: true,
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
        {
          path: '/admin/edit',
          component: './admin/edit'
        }
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
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: {
          webpackChunkName: true,
        },
        title: `LaughingZhu's Blog`,
        // dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
        // hd: true,
        fastClick: true,
      },
    ],
  ],
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
  theme: {
    "primary-color": "#25b864",
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
  base: '/',
  targets: {
    ie: 9,
  },
  history: 'hash',
  runtimePublicPath: true,
  hash: true,
  chainWebpack: function(config, { webpack }) {
    config.merge({
        optimization: {
            minimize: true,
            splitChunks: {
                chunks: 'async', 
                minSize: 20000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
                minChunks: 2, //最小使用到次数，超过2次执行
                automaticNameDelimiter: '.', //连接符
                cacheGroups: {
                    vendors: {
                        // 基本框架
                        name: 'vendors',
                        test: /^.*node_modules[\\/](?!react|react-dom).*$/,
                        chunks: 'all',
                        priority: 10,
                    },
                    'antd': {
                      // 异步加载echarts包
                      name: 'antd',
                      test: /^.*node_modules[\\/](?!antd).*$/,
                      chunks: 'all',
                      priority: 10, // 高于async-commons优先级
                    },
                    'quill': {
                      // 异步加载echarts包
                      name: 'quill',
                      test: /^.*node_modules[\\/](?!quill|quill-emoji).*$/,
                      chunks: 'all',
                      priority: 10, // 高于async-commons优先级
                    },
                    'highlight': {
                      // 异步加载echarts包
                      name: 'highlight',
                      test: /^.*node_modules[\\/](?!highlight).*$/,
                      chunks: 'all',
                      priority: 10, // 高于async-commons优先级
                    },
                    'async-commons': {
                        // 其余异步加载包
                        chunks: 'async',
                        minChunks: 2,
                        name: 'async-commons',
                        priority: 9,
                    },
                    commons: {
                        // 其余同步加载包
                        chunks: 'all',
                        minChunks: 2,
                        name: 'commons',
                        priority: 8,
                    },
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
  // ssr: true,
};
export default config;

