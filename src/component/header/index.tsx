import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { HomeOutlined, SettingOutlined, MessageOutlined, BulbOutlined, KeyOutlined } from '@ant-design/icons';
import { getSearchList } from '../../api/api'
import { Input, Select, Spin } from 'antd'
import './style.less'
import router from 'umi/router';
// import { TweenMax, Split } from 'gsap';

const { Search } = Input;

export default function Header (props: any) {
  const [data, setData] = useState([])
  const [value, setValue] = useState(undefined)
  const [fetching, setFetching] = useState(false)
  useEffect(() => {
    
  }, [''])

  const getSearch = async(value) => {
    console.log('fetching user', value);
    
    let res = await getSearchList({keyword: value})
    if(res.code === 0 && res.data.count > 0) {
      setData(res.data.list)
    } else  {
      alert('数据有误')
    }
  }

  const fetchData = debounce(getSearch, 800)

  const handleChange = (value) => {
    router.push({
      pathname: '/detail',
      query: {
        id: value.value
      }
    })
  }

  return(
    <div className="component-header flex">
      <div className="component-header_title flex">
        {/* <HomeOutlined className='component-header_title_icon' /> */}
        <span>LaughingZhu's Blog</span>
      </div>

      <div className="component-header_container flex">
        {/* <Search
          
          placeholder="search project"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        /> */}
        <Select
          // mode='''
          showSearch
          className='component-header_container_search'
          labelInValue
          value={value}
          placeholder='搜索文章 🔍'
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchData}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {data.map((d: any) => (
            <Select.Option value={d.id} key={`search-item-${d.id}`}>{d.title}</Select.Option>
          ))}
        </Select>
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
