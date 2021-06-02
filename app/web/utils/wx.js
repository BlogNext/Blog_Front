/**
 * wechat jssdk 封装
 * @param { config } 微信config配置
 * @param { content } 微信自定义分享内容配置
 */
import wx from 'weixin-js-sdk';

import { wxShareCount } from '../services/api'
export const wxJssdk = (config, content, bgm) => {
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    // wx.updateAppMessageShareData({ 
    //   title: content.title, // 分享标题
    //   desc: content.desc, // 分享描述
    //   link: content.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: content.imgUrl, // 分享图标
    //   success: function () {
    //     // 设置成功
    //     // console.log('well done');
    //   }
    // });
    
    // wx.updateTimelineShareData({ 
    //     title: content.title, // 分享标题
    //     link: content.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl: content.imgUrl, // 分享图标
    //     success: function () {
    //       // 设置成功
    //     }
    // })

    // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    // https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#45
    wx.hideMenuItems({
      menuList: [
        "menuItem:copyUrl",
        "menuItem:openWithSafari",
        "menuItem:openWithQQBrowser"
      ] 
    });

    /**
     *  即将废弃
     */
    wx.onMenuShareTimeline({
      title: content.title, // 分享标题
      link: content.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: content.imgUrl, // 分享图标
      success: async function () {
        await wxShareCount()
      // 用户点击了分享后执行的回调函数
        window.location.reload();
      },
    })
    
    wx.onMenuShareAppMessage({
      title: content.title, // 分享标题
      desc: content.desc, // 分享描述
      link: content.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: content.imgUrl, // 分享图标
      success: async function () {
      // 用户点击了分享后执行的回调函数
        await wxShareCount()
        window.location.reload();

      }
    });
    if (bgm) {
        bgm.play();
    }
  });

  wx.config(config);
}
