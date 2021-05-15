/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-05-15 14:39:45
 */
import React, { Component } from "react";
import "./index.less";
import Header from '../component/header';
import Aside from '../component/aslide'
import SlideBar from '../component/slidebar'
import Slogan from '../component/slogan'
import Login from '../component/login'
import { getCategoryList } from './service';
import { connect } from "dva";
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
  }



  public render = () => {
    const {
      children,
      location,
      loginStatus
    } = this.props;
    if(location.query.oauthCode) {
      localStorage.setItem('blog_token', location.query.oauthCode)
    }
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
