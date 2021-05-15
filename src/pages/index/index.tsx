/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-05-15 14:21:55
 */
import React, { Component } from "react";
import "./index.less";
import List from '../../component/lsit'
import {history} from 'umi'

interface IndexProps {
  location: any
}
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
    console.log(this.props.location)
    setTimeout(() => {
      this.setState({
        listShow: false
      })
    }, 0);
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
