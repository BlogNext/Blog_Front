/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-10 13:48:37
 * @LastEditros: 
 * @LastEditTime: 2021-05-19 17:06:25
 */
import React, { Component } from "react";
import { getCategoryList } from './service';
// import {getInfo} from '../api/api'
import "./index.less";

interface IProps {
  children: any,
  location: any
}
interface IState {
  cateGoryConf: any,
  tagList: any
}
class AdminLayout extends Component <IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      cateGoryConf: {
        page: 1,
        per_page: 10
      },
      tagList: []
    }
  }
  componentDidMount = () => {
    // BG
    this._initCategory()
    
  }
  

  // get category lists => array
  _initCategory = async () => {
    const res = await getCategoryList({...this.state.cateGoryConf})
    if(res.code === 0) {
      
      res.data.list.length > 0 && localStorage.setItem('blog_tags', JSON.stringify(res.data.list))
      setTimeout(() => {
        this.setState({
          tagList: res.data.list
        })
      }, 0);
    }
  }


  public render = () => {
    const {
      children,
    } = this.props;



    return (

      <div className="layout-admin" >
        {this.state.tagList.length > 0 && children}
      </div>
    );

  }
}

export default AdminLayout;
