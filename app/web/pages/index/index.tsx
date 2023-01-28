/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 21:17:25
 * @LastEditros: 
 * @LastEditTime: 2021-10-09 14:38:56
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
          <title>LaughingZhu的技术文章记录</title>
          <meta name="keywords" content='LaughingZhu Blog LaughingZhu' />
          <meta name="description" content={`LaughingZhu's Blog, 技术、生活、兴趣博客`} />
        </Helmet>
        <List />
        <div className="index-beian">
          <span>Copyright © 2020-2021 LaughingZhu 版权所有 </span>
          <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2020039821号-1</a>
        </div>
      </div>
    );
  }
}


export default Index;
