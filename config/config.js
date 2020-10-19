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
        dll: true,
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
    '/blackend': {
      target: 'http://laughingzhu.com:18083/blackend',
      changeOrigin: true,
      pathRewrite: {
        '^/blackend': '',
      },
      secure: false,
    },
    '/common': {
      target: 'http://laughingzhu.com:18083/common',
      changeOrigin: true,
      pathRewrite: {
        '^/common': '',
      },
      secure: false,
    },
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
};
export default config;

