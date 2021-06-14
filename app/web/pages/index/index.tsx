/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-06-14 14:15:27
 */
import * as React from "react";
import "./style.less";
import List from '../../component/lsit'
import { Helmet } from 'umi'

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
      <div className={`index`}>
        <Helmet encodeSpecialCharacters={false}>
          {/* <html lang="en" data-direction="666" /> */}
          <title>LaughingZhu's Blog</title>
        </Helmet>
        <List />
      </div>
    );
  }
}


export default Index;
