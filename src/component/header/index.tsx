import React, { useEffect, useState } from 'react';
import { HomeOutlined, SettingOutlined, MessageOutlined, BulbOutlined, KeyOutlined } from '@ant-design/icons';

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

      <div className="component-header_tools flex">
        <div className="component-header_tools_item flex">
          <SettingOutlined className="component-header_tools_item_icon" />
        </div>
        <div className="component-header_tools_item flex">
          <MessageOutlined className="component-header_tools_item_icon" />
        </div>
        <div className="component-header_tools_item flex">
          <BulbOutlined className="component-header_tools_item_icon" />
        </div>
        <div className="component-header_tools_item flex">
          <KeyOutlined className="component-header_tools_item_icon" />
        </div>
      </div>
    </div>
  )
}
