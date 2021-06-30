import React, { useEffect, useState } from 'react';
import { getCategoryType } from '../../api/api'
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider, Tooltip } from 'antd'
import './style.less'
import { connect } from 'dva';
import { history, isBrowser } from 'umi'
import { getLocalStorage, setLocalStorage } from '../../utils/utils'

// 本地菜单config

// iconfont 库
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2023298_twboscs9oke.js', // 在 iconfont.cn 上生成
});

const IconAside = [
  {
    icon: 'icon-computer',
    name: 'Front-End'
  },
  {
    icon: 'icon-fuwuqi',
    name: 'Service'
  },
  {
    icon: 'icon-zailiulanqidakai',
    name: 'Browser'
  },
  {
    icon: 'icon-books',
    name: 'Book'
  }
]

const toolsData = [
  {
    label: '管理',
    desc: '后台管理',
    icon: 'icon-setting'
  },
  {
    label: '文章',
    desc: '文章RSS',
    icon: 'icon-rss1'
  },
  {
    label: 'Comment',
    desc: '评论RSS地址',
    icon: 'icon-comment'
  },
]

function Aside (props: any) {
  // 遍历菜单
  // const [ typeList, setTypeList ] = useState(: null )
  const [ typeList, setTypeList ] = useState()

  useEffect(() => {
    _initPage()
  }, [])

  useEffect(() => {
    if(typeList === null) {
      getType()
    }
  }, [typeList])
  

  const _initPage = () => {
    if(!isBrowser()) return false;

    setTypeList(getLocalStorage('blog_category') ? getLocalStorage('blog_category').data : null)

    return;

  }

  const getType = async() => {
    let res = await getCategoryType()
    if(res.code === 0) {
      let pre = [
        {
          label: 'Navigation',
          path:'/Navigation',
          children: [
            {
              icon: 'icon-git-branch',
              label: 'Repository',
              path:'/Repository',
              children: []
            },
            // {
            //   icon: 'icon-books',
            //   label: 'Books',
            //   path:'/Books',
            //   children: []
            // },
            {
              icon: 'icon-time',
              path:'/TimeMachine',
              label: 'TimeMachine',
              children: []
            },
            {
              icon: 'icon-private',
              path:'/Private',
              label: 'Private',
              id: 'private',
              children: []
            }
          ]
        },
        {
          label: 'Components',
          children: res.data.list
        }
      ]
      setLocalStorage('blog_category', pre, 'day')
      setTypeList(pre)
    }
  }

  // 根据配置返回aslide icon
  const getTypeIcon = (name: string, icon?: string) => {
    if(icon !== undefined) return <MyIcon className="component-aside-container_menu_item--children--icon" type={icon} />
    
    // 语雀上的分类
    const result = IconAside.find(item => {
      return item.name === name
    })

    if(result) return <MyIcon className="component-aside-container_menu_item--children--icon" type={result.icon} />
    
    return false
  }


  const typeHandle = (id: any) => {
    if (location.href.indexOf('/detail') < 0) {
      // 在首页，更新分类信息
      if(props.type_id === id) return false;
      props.dispatch({
        type: 'menu/setType',
        payload: {id}
      })
    } else {
      // 不在首页，返回首页
      history.push({
        pathname: '/',
      })
    }
    
  }
  const menuView = () => {
    return (typeList !== null) && (typeList !==undefined) && typeList.length > 0 && typeList.map((item: any, index: number) => {
      return (
        <div className="component-aside-container_menu_item" key={`component-aside-container_menu_item-${index}`}>
          <div className="component-aside-container_menu_item--title">{item.label ? item.label: item.yuque_name}</div>
          {item.children.length > 0 && (
            item.children.map((children: any, cIndex: number) => {
              return (
                <div onClick={() => typeHandle(children.id)} className="component-aside-container_menu_item--children flex" key={`component-aside-container_menu_item--children${cIndex}`}>
                  {getTypeIcon(children.yuque_name, children.icon)}
                  <div className="component-aside-container_menu_item--children--label">{ children.label ? children.label: children.yuque_name}</div>
                </div>
              )
            })
          )}
        </div>
      )
    })
  }
  
  const toolsView = () => {
    return toolsData.length > 0 && toolsData.map((item: any, index: number) => {
      return (
        <Tooltip placement="top" title={item.desc} key={`aside_tools_item-${index}`}>
          <div className="component-aside-container_tools_item flex">
            <MyIcon className="component-aside-container_tools_item--icon" type={item.icon} />
            <div className="component-aside-container_tools_item--label">{item.label}</div>
          </div>
        </Tooltip>
        
      )
    })
  }


  return(
    <div className="component-aside flex">
      <div className="component-aside_info flex">
        <div className="component-aside_info-avatar"/>
        <div className="component-aside_info-name">LaughingZhu</div>
        <div className="component-aside_info-slogan">Make or miss win or lose I put my name on it</div>
      </div>
      <Divider style={{ backgroundColor: '#2e3344', height: '1px', marginTop: '0'}} />
      
      <div className="component-aside-container flex">
        <div className="component-aside-container_menu">
          { menuView() }
        </div>

        <div className="component-aside-container_tools flex">
          { toolsView() }
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { menuList, page, pageSize, total, token, type_id} = state.menu;
  return {
    loading: state.loading.models.menu,
    menuList,
    page,
    type_id,
    pageSize,
    total,
    token
  };
}

export default connect(mapStateToProps)(Aside);
