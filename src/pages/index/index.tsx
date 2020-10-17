import React, { Component } from "react";
import "./index.less";
import { Toast } from "antd-mobile";
import { TweenMax } from 'gsap';
import List from '../../component/lsit'

interface IndexProps {}
interface IndexState {
  listShow: boolean
}

class Index extends Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props)
    this.state = {
      listShow: true
    }
  }

  componentDidMount =  () => {
    setTimeout(() => {
      this.setState({
        listShow: false
      })
    }, 3000);
  }



  public render() {
    const { listShow } = this.state
    return (
      <div className={`index`}>
        {!listShow && <List />}

      </div>
    );
  }
}

export default Index;
