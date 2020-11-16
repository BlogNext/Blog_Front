import React, { useState, useEffect } from 'react'
import { UserOutlined, FieldTimeOutlined, MessageOutlined, EyeOutlined, BarChartOutlined } from '@ant-design/icons'
import marked from 'marked'
import { getDetail } from '../../api/api'
import './style.less'
import { Badge } from 'antd'
import * as dayjs from 'dayjs'
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css'
hljs.initHighlightingOnLoad()
let localizedFormat = require('dayjs/plugin/localizedFormat')


marked.setOptions({ // marked 设置
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    
    return beforNumber(hljs.highlightAuto(code).value)
  }
})
/**
 * 为代码块显示添加行号
 * @param {String} code MD的代码内容
 */
function beforNumber(code) {
  if (!code.trim()) {
    return code;
  }
  const list = code.split('\n');
  const spanList = ['<span aria-hidden="true" line-row>'];
  list.forEach(() => {
    spanList.push('<span></span>');
  });
  spanList.push('</span>');
  list.push(spanList.join(''));
  return list.join('\n');
}


export default function Detail (props: any) {
  dayjs.extend(localizedFormat)
  const [ detail, setDetail ] = useState({})
  useEffect(() => {
    async function detail() {
      let res = await getDetail({id: props.location.query.id})
      if(res.code === 0) {
        setDetail(res.data)
      }
    }
    detail()
  }, [props.location.query.id])


  return (
    <div className="detail">
      {detail.id && (
        <div className="detail-wrapper">
          <div className="detail-wrapper-header flex">
            <h1 className="detail-wrapper-header-title"> {detail.title} </h1>
            <div className="detail-wrapper-header-info flex">
              <div className="detail-wrapper-header-info--item">
                <UserOutlined className='detail-wrapper-header-info--icon' />
                <span> {detail.user_info.nickname} </span>
              </div>
              <div className="detail-wrapper-header-info--item">
                <FieldTimeOutlined className='detail-wrapper-header-info--icon' />
                <span>{dayjs.unix(detail.created_at).locale('en').format('LL')}  </span>
              </div>
              <div className="detail-wrapper-header-info--item">

                <EyeOutlined className="detail-wrapper-header-info--icon" />
                <span>{detail.browse_total} views</span>
              </div>
              <div className="detail-wrapper-header-info--item">

                <BarChartOutlined className="detail-wrapper-header-info--icon" />
                <span>1888 words</span>
              </div>
              <div className="detail-wrapper-header-info--item">
                <Badge dot>
                  <MessageOutlined className='detail-wrapper-header-info--icon' />
                </Badge>
                <span>No comments</span>
              </div>
            </div>
          </div>
          <div className="detail-wrapper-content" >
            <div className="detail-wrapper-content-main" dangerouslySetInnerHTML = {{ __html: marked(detail.content).replace(/img/g, 'img referrerPolicy="no-referrer"') }}></div>
          </div>
        </div>
      )}
    </div>
  )
}