import React, { Component } from "react";
import "./index.less";

interface IProps {
  children: any,
  location: any
}
interface IState {}
class BasicLayout extends Component <IProps, IState> {

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
        {children}
      </div>
    );

  }
}

export default BasicLayout;
