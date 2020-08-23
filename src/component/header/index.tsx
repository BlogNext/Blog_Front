import React, { useEffect, useState } from 'react';
import {HomeOutlined} from '@ant-design/icons';
import { Input } from 'antd'
import './style.less'

const { Search } = Input;

export default function Header (props: any) {
  return(
    <div className="component-header flex">
      <div className="component-header_title flex">
        {/* <HomeOutlined className='component-header_title_icon' /> */}
        <span>LaughingZhu's Blog</span>
      </div>

      <div className="component-header_container flex">
        <Search
          className='component-header_container_search'
          placeholder="search project"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
      </div>

      <div className="component-header_tools">

      </div>
    </div>
  )
}
