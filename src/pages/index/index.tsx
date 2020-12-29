import React, { Component } from "react";
import "./index.less";
import List from '../../component/lsit'
import router from 'umi/router'

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
