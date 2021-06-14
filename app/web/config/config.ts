/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-28 16:38:09
 * @LastEditros: 
 * @LastEditTime: 2021-06-14 13:51:28
 */
import { defineConfig } from 'umi';
import { join } from 'path';

const cwd = process.cwd();
const manifest = join(cwd, 'config/manifest.json');

export default defineConfig({
  ssr: {
    devServerRender: false,
    // forceInitial: true,
    // mode: 'stream'
  },
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    // 为 ''，不然会有两个 /
    
  },
  publicPath: '/public/',
  base: '/public/',
  favicon: '../public/favicon.ico',
  dynamicImport: {},
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  // exportStatic: {},
  dva: {
    immer: true,
    // hmr: false,
  },
  metas: [
    {
      name: 'keywords',
      content: 'LaughingZhu Blog LaughingZhu',
    },
    {
      name: 'description',
      content: `LaughingZhu's Blog, 技术、生活、兴趣博客`,
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  title: "LaughingZhu Blog",
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
  
});
