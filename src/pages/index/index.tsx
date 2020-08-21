import React, { Component } from "react";
import "./index.less";
import { Toast } from "antd-mobile";
import { TweenMax } from 'gsap';

interface IndexProps {}
interface IndexState {

}

class Index extends Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }

  componentDidMount =  () => {

  }



  public render() {
    return (
      <div className={`index`}>
        index
      
      </div>
    );
  }
}

export default Index;
