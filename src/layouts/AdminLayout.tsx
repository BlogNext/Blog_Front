import React, { Component } from "react";
import Header from '../component/header';
import { getCategoryList } from './service';
// import {getInfo} from '../api/api'
import "./index.less";

interface IProps {
  children: any,
  location: any
}
interface IState {}
class AdminLayout extends Component <IProps, IState> {


  componentDidMount = () => {
    // BG
    // this._initCategory()
  }

  // get category lists => array
  // _initCategory = async () => {
  //   const res = await getInfo()
  //   if(res.status === 200) {
  //     console.log(res)
  //   }
  // }


  public render = () => {
    const {
      children,
      location
    } = this.props;
    if(location.query.oauthCode) {
      localStorage.setItem('blog_token', location.query.oauthCode)
    }
    return (

      <div className="layout-admin" >
        {children}
      </div>
    );

  }
}

export default AdminLayout;
