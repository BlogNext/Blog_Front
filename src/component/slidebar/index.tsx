import React, { useEffect, useState } from 'react';
import { FireOutlined, MessageOutlined, GiftOutlined, BellOutlined, FieldTimeOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { getBlogBySort, getBlogInfo } from '../../api/api'
import './style.less'
import * as dayjs from 'dayjs'
import { message } from 'antd';
import { history } from 'umi';
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

const infoData = [
  {
    label: 'Posts Num',
    icon: <BellOutlined className="component-slidebar--info_content-item--desc_icon" />,
    num: 1,
    string: 'blog_total'
  },
  {
    label: 'Comments Num',
    icon: <MessageOutlined className="component-slidebar--info_content-item--desc_icon" />,
    string: ''
  },
  {
    label: 'Operating Days',
    icon: <FieldTimeOutlined className="component-slidebar--info_content-item--desc_icon" />,
    num: 1,
    string: 'diff_time'
  },
  {
    label: 'Last activity',
    icon: <NodeIndexOutlined className="component-slidebar--info_content-item--desc_icon" />,
    num: 1,
    string: 'last_create_at'
  }
]

function Slidebar (props: any) {
  const [ current, setCurrent ] = useState(0)
  const [listData, setListData] = useState([])
  const [blogInfo, setBlogInfo] = useState({})

  // 初始化sortListData，跟随current 变化
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

  // 初始化 blog info data，初始化请求一次
  useEffect(() => {
    async function getInfo () {
      let res = await getBlogInfo()
      if(res.code === 0) {
        // 获取成功
        setBlogInfo(res.data.list)
      } else {
        message.error(res.msg, 2)
      }
    }

    getInfo()
  }, [''])


  const menuChange = (index: number) => {
    if(index === current) return false

    setCurrent(index)
    return false;
  }
  

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

  /**
   * 根据时间错
   * @param diffTimestamp 两个时间戳的差，单位秒
   */
  const getRemainderTime = (diffSecond: number) => {
    let runTime = diffSecond
    let year = Math.floor(runTime / 86400 / 365);

    runTime = runTime % (86400 * 365);
    
    let month = Math.floor(runTime / 86400 / 30);

    runTime = runTime % (86400 * 30);

    let day = Math.floor(runTime / 86400);

    // runTime = runTime % 86400;

    // let hour = Math.floor(runTime / 3600);

    // runTime = runTime % 3600;

    // let minute = Math.floor(runTime / 60);

    // runTime = runTime % 60;

    // let second = runTime;

　　return `${month === 0 ? '12 M ' : month + ' M '}${day === 0 ? '' : day + ' D'} `;
  }

  const getBlogInfoValue = (type: string, value: any) => {
    console.log(type, value)
    switch (type) {
      case 'blog_total':
        return value
        break;
      case 'diff_time':
        return getRemainderTime(value)
        break;
      case 'last_create_at':
        return dayjs.unix(value).locale('en').format('ll')
        break;
      default:
        return 0
        break;
    }
  }


  const listHandle = (detail_id: number) => {
    history.push({
      pathname: `/detail`,
      query: {
        id: detail_id
      }
    })
  }

  const listView = listData.length > 0 && listData.map((item: any, index: number) => {
    return (
      <div onClick={() => listHandle(item.id)} className="component-slidebar--menu_content--list-item flex" key={`component-slidebar--menu_content--list-item-${index}`}>
        <div style={{ backgroundImage: `url('${item.cover_plan_info.full_url}')` }}  className="component-slidebar--menu_content--list-item--avatar bg"/>
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
        <div className="component-slidebar--info_content-item_count"> {getBlogInfoValue(infoData[index].string, blogInfo[infoData[index].string])} </div>
      </div>
    )
  })
  
  return(
    <div className="component-slidebar flex">


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
