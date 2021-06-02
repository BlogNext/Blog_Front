/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-28 16:29:48
 * @LastEditros: 
 * @LastEditTime: 2021-05-31 09:49:49
 */
import React, { useEffect, useState } from 'react'

import './style.less'


export default function Slogan (props: any) {
  useEffect(() => {
    // console.log('slogan-render')
  }, [''])

  const sloganClick = () => {
    (window as any)._hmt.push(['_trackEvent', 'slogan点击', 'click']);
    (window as any).gtag('event', 'slogan click', {
      'event_category': 'click',
      'event_label': 'slogan',
    });
    
  }


  return (
    <div className="component-slogan flex">
      <div className="component-slogan-name" onClick={() => sloganClick()}  data-spotlight={`LaughingZhu's Blog`}>LaughingZhu's Blog</div>
      <div className="component-slogan-desc" >桌上的文字太拥挤 想出去走走去散心</div>
    </div>
  )
}