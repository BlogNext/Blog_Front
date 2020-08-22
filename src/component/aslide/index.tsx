import React, { useEffect, useState } from 'react';
import { Divider } from 'antd'
import './style.less'

export default function Aside (props: any) {
  return(
    <div className="component-aside">
      <div className="component-aside_info flex">
        <div className="component-aside_info-avatar"/>
        <div className="component-aside_info-name">LaughingZhu</div>
      </div>
      <Divider style={{ backgroundColor: '#2e3344', height: '1px'}} />
    </div>
  )
}
