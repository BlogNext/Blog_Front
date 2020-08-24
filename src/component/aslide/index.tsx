import React, { useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider } from 'antd'
import './style.less'

const menu = [
  {
    label: 'Navigation',
    children: [
      {
        icon: 'icon-git-branch',
        label: 'Repository'
      },
      {
        icon: 'icon-books',
        label: 'Books'
      },
      {
        icon: 'icon-time',
        label: 'TimeMachine'
      }
    ]
  },
  {
    label: 'Components',
    children: [
      {
        icon: 'icon-categories_',
        label: 'Categories'
      },
      {
        icon: 'icon-pages',
        label: 'Pages'
      },
      {
        icon: 'icon-Link',
        label: 'Links'
      }
    ]
  }
]

// iconfont 库
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2023298_mwxq6tfy5w.js', // 在 iconfont.cn 上生成
});

export default function Aside (props: any) {
  // 遍历菜单
  const menuView = () => {
    return menu.length > 0 && menu.map((item: any, index: number) => {
      return (
        <div className="component-aside_menu_item" key={`component-aside_menu_item-${index}`}>
          <div className="component-aside_menu_item--title">{item.label}</div>
          {item.children.length > 0 && (
            item.children.map((children: any, cIndex: number) => {
              return (
                <div className="component-aside_menu_item--children flex" key={`component-aside_menu_item--children${cIndex}`}>
                  <MyIcon className="component-aside_menu_item--children--icon" type={children.icon} />
                  <div className="component-aside_menu_item--children--label">{ children.label }</div>
                </div>
              )
            })
          )}
        </div>
      )
    })
  }


  return(
    <div className="component-aside">
      <div className="component-aside_info flex">
        <div className="component-aside_info-avatar"/>
        <div className="component-aside_info-name">LaughingZhu</div>
        <div className="component-aside_info-slogan">Make or miss win or lose I put my name on it</div>
      </div>
      <Divider style={{ backgroundColor: '#2e3344', height: '1px', marginTop: '0'}} />

      <div className="component-aside_menu">{ menuView() }</div>
    </div>
  )
}
