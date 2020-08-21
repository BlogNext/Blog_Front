import './global.less';
// import Vconsole from 'vconsole'
import { wxJssdk } from '@/utils/wx'
import { weChatJssdk } from '@/services/api'
// new Vconsole()


// 添加背景音乐 wxSDK
// const bgmusic = require('@/assets/audio/bgm.mp3');
// const elAudio = new Audio();
// // @ts-ignore
// window.el_audio = elAudio;
// elAudio.setAttribute('src', bgmusic);
// elAudio.setAttribute('id', 'audio')
// elAudio.loop = true;
// elAudio.play()



weChatJssdk(window.location.href).then(res => {
  wxJssdk(res.data, {
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
  }, null)
})
