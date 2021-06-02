/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-05-31 09:12:26
 */
import * as React from "react";
import "./style.less";
import List from '../../component/lsit'

interface IndexProps {
  location: any,
  dispatch:any
}
interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  public render() {
    return (
      <div className={`index`}><List /></div>
    );
  }
}


export default Index;
