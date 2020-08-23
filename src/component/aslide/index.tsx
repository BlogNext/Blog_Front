import React, { useEffect, useState } from 'react';
import { Divider } from 'antd'
import './style.less'

export default function Aside (props: any) {
  return(
    <div className="component-aside">
      <div className="component-aside_info flex">
        <div className="component-aside_info-avatar"/>
        <div className="component-aside_info-name">LaughingZhu</div>
        <div className="component-aside_info-slogan">Make or miss win or lose I put my name on it</div>
      </div>
      <Divider style={{ backgroundColor: '#2e3344', height: '1px', marginTop: '0'}} />

      <div className="component-menu">
        ddd
      </div>
    </div>
  )
}
