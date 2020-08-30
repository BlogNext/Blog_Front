import React, { useEffect, useState } from 'react'
import { Badge, Pagination } from 'antd'
import { UserOutlined, FieldTimeOutlined, MessageOutlined } from '@ant-design/icons'

import './style.less'

function List (props: any) {

  const [ list, setList ] = useState([])

  useEffect(() => {
    console.log('render_list')
    setList([1,2,3,4,5,6,7,8,9])
  }, [''])


  return (
    <div className="component-list flex">
      { list.length > 0 && list.map((item: any[], index :number) => {
        return (
          <div className="component-list_item flex" key={`component-list_item-${index}`}>
            <div className="component-list_item--img" />

            <div className="component-list_item--info flex">
              <div className="component-list_item--info_title">看得sfsdfsdfsd开了分公sdfsdfsdfsdffdss司抵抗力国际快递升龙国际</div>
              <div className="component-list_item--info_desc">看得sfsdfsdfsd开了分公sdfs
                dfsdfsdffdss司抵抗力国际快递升龙国际</div>
              <div className="component-list_item--info_line" />
              <div className="component-list_item--info_utils flex">
                <div className="component-list_item--info_utils--item">
                  <UserOutlined className='component-list_item--info_utils--icon' />
                  <span>LaughingZhu</span>
                </div>
                <div className="component-list_item--info_utils--item">
                  <FieldTimeOutlined className='component-list_item--info_utils--icon' />
                  <span>February 9, 2020 </span>
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
      <Pagination onChange={() => console.log(222)} className='component-list_pagination' showLessItems defaultCurrent={1} current={2} total={49} />
    </div>
  )
}

export default List