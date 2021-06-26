/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-06-26 16:47:14
 */
import React, { Component } from "react";
import "./index.less";
import Header from '../component/header';
import Aside from '../component/aslide'
import SlideBar from '../component/slidebar'
import Slogan from '../component/slogan'
import Login from '../component/login'
import qs from 'qs'

import { getCategoryList } from './service';
import { connect } from "dva";
import { isBrowser } from "umi";
import oauthSdk from '@laughingzhu/oauthsdk'
// import { getCategoryList } from '../api/api'
interface IProps {
  children: any,
  location: any,
  loginStatus: boolean
}
interface IState {
  cateGoryConf: any
}
class BasicLayout extends Component <IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      cateGoryConf: {
        page: 1,
        per_page: 10
      }
    }
  }
  componentDidMount = () => {
    const searchQuery = qs.parse(location.search, {ignoreQueryPrefix: true })
    new oauthSdk('blog_1616644960', 'https://blog.laughingzhu.cn/front/login/login_blog_next_pre_code').login()
    if(searchQuery.token) {
      localStorage.setItem('blog_token', searchQuery.token)
      let initData = JSON.parse(JSON.stringify(searchQuery))
      delete initData.pre_auth_code
      delete initData.token
      console.log(initData, '11111111')
      
      location.replace(`${location.href.split('?')[0]}${Object.keys(initData).length > 0 ? '?' : ''}${qs.stringify(initData)}`)
    }
  }



  public render = () => {
    const {
      children,
      location,
      loginStatus
    } = this.props;

    return (

      <div className="layout" >
        <div className="layout-header">
          <div className="layout-header-container"><Header /></div>
        </div>
        <div className="layout-container flex">
          <div className="layout-container-aside"><Aside /></div>
          <div className="layout-container-content flex">
            <div className="layout-container-content-main">
              <Slogan />
              {children}
            </div>
            <div className="layout-container-content-slidebar flex"><SlideBar /></div>
          </div>
        </div>

        { loginStatus && <Login />}
      </div>
    );

  }
}

function mapStateToProps(state) {
  const { loginStatus } = state.menu;
  return {
    loginStatus
  };
}


export default connect(mapStateToProps)(BasicLayout);
