import React, { useEffect, useState } from 'react';
import { FireOutlined, MessageOutlined, GiftOutlined, BellOutlined, FieldTimeOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { getBlogBySort } from '../../api/api'
import './style.less'
import * as dayjs from 'dayjs'
const menuData = [
  {
    label : 'Popular artivles',
    sort_dimension: 'browse_total',
    string: 'browse_total',
    icon: <FireOutlined className='component-slidebar--menu_header-item--icon' />,
    itemIcon: <FireOutlined className='component-slidebar--menu_content--list-item--desc_comment--icon' />
  },
  {
    label : 'Latest comments',
    sort_dimension: 'created_at',
    string: 'browse_total',

    icon: <FieldTimeOutlined className='component-slidebar--menu_header-item--icon' />,
    itemIcon: <FieldTimeOutlined className='component-slidebar--menu_content--list-item--desc_comment--icon' />
  },
  {
    label : 'Random articles',
    string: 'browse_total',

    sort_dimension: '',
    icon: <GiftOutlined className='component-slidebar--menu_header-item--icon' />,
    itemIcon: <MessageOutlined className='component-slidebar--menu_content--list-item--desc_comment--icon' />

  }
]


function Slidebar (props: any) {
  const [ current, setCurrent ] = useState(0)
  const [listData, setListData] = useState([])
  useEffect(() => {
    async function getListData() {
      let res = await getBlogBySort({ sort_dimension: menuData[current].sort_dimension})
      if(res.code === 0) {
        // success
        setListData(res.data.list)
      }
    }
    getListData()

  }, [current])
  const menuChange = (index: number) => {
    if(index === current) return false

    setCurrent(index)
    return false;
  }
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

  const getItemView = (item: any) => {

    switch (current) {
      case 0:
        return item[menuData[current].string]
        break;
      case 1:
        return dayjs.unix(item.cover_plan_info.created_at).locale('en').format('ll')
        break;
      case 2:
    
        break;
      default:
        break;
    }
  }
  const listView = listData.length > 0 && listData.map((item: any, index: number) => {
    return (
      <div className="component-slidebar--menu_content--list-item flex" key={`component-slidebar--menu_content--list-item-${index}`}>
        <img src={require('../../assets/img/avatar.jpg')} alt="" className="component-slidebar--menu_content--list-item--avatar"/>
        <div className="component-slidebar--menu_content--list-item--desc">
          <div className="component-slidebar--menu_content--list-item--desc_label"> {item.title} </div>
          <div className="component-slidebar--menu_content--list-item--desc_comment">
            {menuData[current].itemIcon}
            {getItemView(item)}
          </div>

        </div>
      </div>
    )
  })

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
  return(
    <div className="component-slidebar flex">
      {/* <Menu />
      <Info /> */}

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

      <div className="component-slidebar--info">
        <div className="component-slidebar--info_title">Blog Info</div>
        <div className="component-slidebar--info_content"> {infoView} </div>
      </div>
    </div>
  )
}

export default Slidebar;
