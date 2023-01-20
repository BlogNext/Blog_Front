/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-28 16:38:09
 * @LastEditros: 
 * @LastEditTime: 2021-07-01 17:36:21
 */
import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    // 为 ''，不然会有两个 /
    // publicPath: '',

  },
  publicPath: '/public/',
  base: '/',
  dynamicImport: {},
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    
    baseSeparator: '-',
  },
  dva: {
    immer: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  title: false,
  routes: [
    
    {
      path: '/detail',
      component: '@/layouts/DetailLayout',
      routes: [
        {
          path: '/detail/:id',
          component: '@/pages/detail/[id]',
        },
      ]
    },
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        
        {
          path: '/',
          component: '@/pages/index/index',
        },
        {
          path: '/index',
          redirect: '/',
          component: '@/pages/index/index',
        },
        
      ],
      
    },
  ],
  analytics: {
    // ga: 'google analytics code',
    baidu: '3fab054e7fc3980bf1641413481bdb86',
  },
  
});
