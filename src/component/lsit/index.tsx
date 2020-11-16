import React, { useEffect, useState } from 'react'
import { Badge, Pagination } from 'antd'
import { UserOutlined, FieldTimeOutlined, MessageOutlined } from '@ant-design/icons'
import * as dayjs from 'dayjs'
import { getList } from '../../api/api'
var localizedFormat = require('dayjs/plugin/localizedFormat')
import router from 'umi/router'
import './style.less'

function List (props: any) {
  dayjs.extend(localizedFormat)
  const [ pageInfo, setPageInfo ] = useState({ page: 1, total: 1, pageSize: 10})
  const [ list, setList ] = useState([])

  useEffect(() => {
    async function getArticleList() {
      const res = await getList({page: pageInfo.page, per_page: pageInfo.pageSize})
      if(res.code === 0) {
        setList(res.data.list)
        setPageInfo({...pageInfo, total: res.data.count})
      } else {
        console.log('获取失败哦！')
      }
    }
    getArticleList()
  }, [pageInfo.page])


  const detailView = (data: any) => {
    window.localStorage.setItem('detail', JSON.stringify(data))
    router.push({
      pathname: `/detail`,
      query: {
        id: data.id
      }
    })
  }

  const pageChange = (e: any) => {
    setPageInfo({...pageInfo, page: e})
  }




  return (
    <div className="component-list flex">
      { list.length > 0 && list.map((item: any, index :number) => {
        return (
          <div onClick={() => detailView(item)} className="component-list_item flex" key={`component-list_item-${index}`}>
            <div className="component-list_item--img" style={{ backgroundImage: `url(${item.cover_plan_info.full_url})`}} />

            <div className="component-list_item--info flex">
              <div className="component-list_item--info_title"> {item.title} </div>
              <div className="component-list_item--info_desc"> {item.abstract} </div>
              <div className="component-list_item--info_line" />
              <div className="component-list_item--info_utils flex">
                <div className="component-list_item--info_utils--item">
                  <UserOutlined className='component-list_item--info_utils--icon' />
                  <span> {item.user_info.nickname} </span>
                </div>
                <div className="component-list_item--info_utils--item">
                  <FieldTimeOutlined className='component-list_item--info_utils--icon' />
                  <span>{`${dayjs.unix(item.created_at).locale('en').format('LL')}`}  </span>
                </div>
                <div className="component-list_item--info_utils--item">
                  <Badge dot>
                    <MessageOutlined className='component-list_item--info_utils--icon' />
                  </Badge>
                  <span>No comments</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <Pagination onChange={(e) => pageChange(e)} className='component-list_pagination' showLessItems  current={pageInfo.page} total={pageInfo.total} />
    </div>
  )
}

export default List