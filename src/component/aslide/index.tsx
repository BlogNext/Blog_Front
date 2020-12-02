import React, { useEffect, useState } from 'react';
import { getCategoryType } from '../../api/api'
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider, Tooltip } from 'antd'
import './style.less'


// 本地菜单config

const menuData = [
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
      {
        icon: 'icon-books',
        label: 'Books',
        path:'/Books',
        children: []
      },
      {
        icon: 'icon-time',
        path:'/TimeMachine',
        label: 'TimeMachine',
        children: []
      }
    ]
  },
  {
    label: 'Components',
    children: [
      {
        icon: 'icon-categories_',
        path:'/Categories',
        label: 'Categories',
        children: []
      },
      {
        icon: 'icon-pages',
        path:'/RepositPagesory',
        label: 'Pages',
        children: []
      },
      {
        icon: 'icon-Link',
        path:'/Links',
        label: 'Links',
        children: []
      }
    ]
  }
]

// iconfont 库
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2023298_wzfwjgkmi2.js', // 在 iconfont.cn 上生成
});

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

export default function Aside (props: any) {
  // 遍历菜单
  const [ typeList, setTypeList ] = useState([])
  useEffect(() => {
    async function getType () {
      let res = await getCategoryType()
      console.log(res)
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
              {
                icon: 'icon-books',
                label: 'Books',
                path:'/Books',
                children: []
              },
              {
                icon: 'icon-time',
                path:'/TimeMachine',
                label: 'TimeMachine',
                children: []
              }
            ]
          },
          {
            label: 'Components',
            children: res.data.list
          }
        ]
        setTypeList(pre)
      }
    }
    getType()
  }, [''])
  const menuView = () => {
    return typeList.length > 0 && typeList.map((item: any, index: number) => {
      return (
        <div className="component-aside-container_menu_item" key={`component-aside-container_menu_item-${index}`}>
          <div className="component-aside-container_menu_item--title">{item.label ? item.label: item.yuque_name}</div>
          {item.children.length > 0 && (
            item.children.map((children: any, cIndex: number) => {
              return (
                <div className="component-aside-container_menu_item--children flex" key={`component-aside-container_menu_item--children${cIndex}`}>
                  {children.icon && <MyIcon className="component-aside-container_menu_item--children--icon" type={children.icon} />}
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
