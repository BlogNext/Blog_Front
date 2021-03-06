/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-06-02 22:19:51
 */
import React, { useEffect, useState } from 'react'
import { Badge, Pagination } from 'antd'
import { UserOutlined, FieldTimeOutlined, MessageOutlined } from '@ant-design/icons'
import * as dayjs from 'dayjs'
// import { connect } from 'dva';
var localizedFormat = require('dayjs/plugin/localizedFormat')
import {history, connect } from 'umi'
import './style.less'
function List (props) {
  dayjs.extend(localizedFormat)
  // console.log(props, 'props')
  useEffect(() => {
    props.dispatch({
      type: 'menu/getLists',
      payload: {id:  props.type_id}
    })
  }, [props.page, props.type_id, props.token])


  const detailView = (data) => {
    // window.localStorage.setItem('detail', JSON.stringify(data))
    history.replace({
      pathname: `/detail/${data.id}`,
    })
  }

  const pageChange = (e) => {
    props.dispatch({
      type: 'menu/getPage',
      payload: { page: e}
    })
  }




  return (
    <div className="component-list flex">
      { props.menuList.length > 0 && props.menuList.map((item, index) => {
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
      {props.menuList.length > 0 && <Pagination onChange={(e) => pageChange(e)} className='component-list_pagination' showLessItems  current={props.page} total={props.total} />}
      
    </div>
  )
}

function mapStateToProps(state) {
  const { menuList, page, pageSize, total, type_id, token } = state.menu;
  return {
    loading: state.loading.models.menu,
    menuList,
    page,
    pageSize,
    total,
    type_id,
    token
  };
}

export default connect(mapStateToProps)(List);