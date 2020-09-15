import React, { useEffect, useState } from 'react'

import './style.less'


export default function Slogan (props: any) {
  useEffect(() => {
    console.log('slogan-render')
  }, [''])


  return (
    <div className="component-slogan flex">
      <div className="component-slogan-name"  data-spotlight={`LaughingZhu's Blog`}>LaughingZhu's Blog</div>
      <div className="component-slogan-desc" >桌上的文字太拥挤 想出去走走去散心</div>
    </div>
  )
}