import React, { useEffect, useState } from 'react';
import { FireOutlined, MessageOutlined, GiftOutlined, BellOutlined, FieldTimeOutlined, NodeIndexOutlined } from '@ant-design/icons'

import './style.less'

const menuData = [
  {
    label : 'Popular artivles',
    icon: <FireOutlined className='component-slidebar--menu_header-item--icon' />
  },
  {
    label : 'Latest comments',
    icon: <MessageOutlined className='component-slidebar--menu_header-item--icon' />
  },
  {
    label : 'Random articles',
    icon: <GiftOutlined className='component-slidebar--menu_header-item--icon' />
  }
]


const listData = [1,2,3,4,5]

function Menu (props: any) {
  const [ current, setCurrent ] = useState(1)
  const menuChange = (index: number) => {
    if(index === current) return false

    setCurrent(index)
  }

  const listView = listData.length > 0 && listData.map((item: any, index: number) => {
    return (
      <div className="component-slidebar--menu_content--list-item flex">
        <img src={require('../../assets/img/avatar.jpg')} alt="" className="component-slidebar--menu_content--list-item--avatar"/>
        <div className="component-slidebar--menu_content--list-item--desc">
          <div className="component-slidebar--menu_content--list-item--desc_label">记得快的三个大嫁风尚挂号费的</div>
          <div className="component-slidebar--menu_content--list-item--desc_comment">
            <MessageOutlined className='component-slidebar--menu_content--list-item--desc_comment--icon' />
            {0}
          </div>

        </div>
      </div>
    )
  })
  return (
    <div className="component-slidebar--menu flex">
      <div className="component-slidebar--menu_header flex">
        { menuData.map((item: any, index: any) => {
          return (
            <div onClick={() => menuChange(index)} className={`component-slidebar--menu_header-item flex ${current === index && 'component-slidebar--menu_header-item--active' }`} key={`component-slidebar--menu_header-item-${item.label}`}>
              {item.icon}
              <span className='component-slidebar--menu_header-item--line' />
            </div>
          )
        })}
      </div>
      <div className="component-slidebar--menu_content flex">
        <div className="component-slidebar--menu_content--title">{ menuData[current].label }</div>
        <div className="component-slidebar--menu_content--list">{listView}</div>
      </div>
    </div>
  )
}

// blog Info
function Info (props: any) {
  const infoData = [
    {
      label: 'Posts Num',
      icon: <BellOutlined className="component-slidebar--info_content-item--desc_icon" />,
      num: 1,
    },
    {
      label: 'Comments Num',
      icon: <MessageOutlined className="component-slidebar--info_content-item--desc_icon" />,
      num: 1,
    },
    {
      label: 'Operating Days',
      icon: <FieldTimeOutlined className="component-slidebar--info_content-item--desc_icon" />,
      num: 1,
    },
    {
      label: 'Last activity',
      icon: <NodeIndexOutlined className="component-slidebar--info_content-item--desc_icon" />,
      num: 1,
    }
  ]

  const infoView = infoData.length > 0 && infoData.map((item: any, index: number) => {
    return (
      <div className="component-slidebar--info_content-item flex" key={`component-slidebar--info_content-item-${index}`}>
        <div className="component-slidebar--info_content-item--esc flex">
          { item.icon }
          <div className="component-slidebar--info_content-item--desc_label">{ item.label }</div>
        </div>
        <div className="component-slidebar--info_content-item_count"> {item.num} </div>
      </div>
    )
  })

  return (
    <div className="component-slidebar--info">
      <div className="component-slidebar--info_title">Blog Info</div>
      <div className="component-slidebar--info_content"> {infoView} </div>
    </div>
  )
}

function Slidebar (props: any) {
  

  return(
    <div className="component-slidebar flex">
      <Menu />
      <Info />
    </div>
  )
}

export default Slidebar;
