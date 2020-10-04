import React, { useEffect, useState } from 'react'

import './style.less'


export default function Slogan (props: any) {
  useEffect(() => {
    console.log('slogan-render')
  }, [''])

  const sloganClick = () => {
    console.log('slogan click');
    (window as any)._hmt.push(['_trackEvent', 'slogan', 'click']);
  }


  return (
    <div className="component-slogan flex">
      <div className="component-slogan-name" onClick={() => sloganClick()}  data-spotlight={`LaughingZhu's Blog`}>LaughingZhu's Blog</div>
      <div className="component-slogan-desc" >桌上的文字太拥挤 想出去走走去散心</div>
    </div>
  )
}