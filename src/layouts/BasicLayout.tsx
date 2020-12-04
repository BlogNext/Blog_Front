import React, { Component } from "react";
import "./index.less";
import Header from '../component/header';
import Aside from '../component/aslide'
import SlideBar from '../component/slidebar'
import Slogan from '../component/slogan'
import { getCategoryList } from './service';
// import { getCategoryList } from '../api/api'
interface IProps {
  children: any,
  location: any
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
      location
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
            <div className="layout-container-content-slidebar"><SlideBar /></div>
          </div>
        </div>
      </div>
    );

  }
}

export default BasicLayout;
