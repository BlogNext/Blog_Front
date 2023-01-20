import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { SettingOutlined, MessageOutlined, BulbOutlined, KeyOutlined } from '@ant-design/icons';
import { getSearchList } from '../../api/api'
import { Select, Spin } from 'antd'
import './style.less'
import { history, withRouter } from 'umi';
import { connect } from 'dva';


function Header (props: any) {
  const [data, setData] = useState([])
  const [value, setValue] = useState(undefined)
  const [fetching, setFetching] = useState(false)
  useEffect(() => {
  }, [''])

  const getSearch = async(value) => {
    let res = await getSearchList({keyword: value})
    if(res.code === 0) {
      setData(res.data.list)
    } else  {
      alert('数据有误')
    }
  }

  const fetchData = debounce(getSearch, 800)

  const handleChange = (value) => {
    history.push({
      pathname: `/detail/${value.value}`,
    })
  }

  const titleHandle = () => {
    const hashname = props.match.url
    props.dispatch({
      type: 'menu/setType',
      payload: {id: null}
    })
    if(hashname !== '/') {
      // 不在首页，返回首页
      history.push({
        pathname: '/',
      })
    }
  }

  return(
    <div className="component-header flex">
      <div onClick={titleHandle} className="component-header_title flex">
        {/* <HomeOutlined className='component-header_title_icon' /> */}
        <span >LaughingZhu's Blog</span>
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
          showArrow={data.length > 0 ? true : false}
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

function mapStateToProps(state) {
  const { menuList, page, pageSize, total} = state.menu;
  return {
    loading: state.loading.models.menu,
    menuList,
    page,
    pageSize,
    total
  };
}

export default withRouter(connect(mapStateToProps)(Header));
