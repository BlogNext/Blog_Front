/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-05-15 21:33:54
 */
import './global.less';
import qs from 'qs'
import oauthSdk from '@laughingzhu/oauthsdk'
// bg()
// import Vconsole from 'vconsole'
// import { wxJssdk } from '@/utils/wx'
// import { weChatJssdk } from '@/services/api'
// import { oauthSdk } from '@laughingzhu/oauthsdk';
new oauthSdk('blog_1616644960', 'https://blog.laughingzhu.cn/front/login/login_blog_next_pre_code').login()


// 添加背景音乐 wxSDK
// const bgmusic = require('@/assets/audio/bgm.mp3');
// const elAudio = new Audio();
// // @ts-ignore
// window.el_audio = elAudio;
// elAudio.setAttribute('src', bgmusic);
// elAudio.setAttribute('id', 'audio')
// elAudio.loop = true;
// elAudio.play()



// weChatJssdk(window.location.href).then(res => {
//   wxJssdk(res.data, {
//     title: '',
//     desc: '',
//     link: '',
//     imgUrl: '',
//   }, null)
// })


/**
 *  项目配置
 */

// 保存登录token
const searchQuery = qs.parse(location.search, {ignoreQueryPrefix: true })
console.log(111)
if(searchQuery.token) {
  localStorage.setItem('blog_token', searchQuery.token)
}


(() => {
  if(window.localStorage.getItem('blog_config')) return false

  const data = {
    name: 'LaughingZhu',
    theme: 'default',
    color: 'default',
    bgColor: 'default',
    fixHeader: true,
    fixMenu: true,
    fixTag: true
  }
  window.localStorage.setItem('blog_config', JSON.stringify(data))
})()

// 监听hash router change
window.addEventListener('hashchange', (e) => {
  const { newURL, oldURL } = e
  console.log(newURL, oldURL)
}, false);
