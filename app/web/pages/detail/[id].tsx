import React, { useState, useEffect } from 'react'
import { UserOutlined, FieldTimeOutlined, MessageOutlined, EyeOutlined, BarChartOutlined } from '@ant-design/icons'
import marked from 'marked'
import { getDetail } from '../../api/api'
import './style.less'
import { Badge } from 'antd'
import * as dayjs from 'dayjs'
const hljs = require('highlight.js');
import 'highlight.js/styles/darcula.css'
// hljs.initHighlightingOnLoad()
let localizedFormat = require('dayjs/plugin/localizedFormat')
import { connect, isBrowser, useParams, Helmet } from 'umi';


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


const Detail = (props: any) => {
  const { id } = useParams()
  useEffect(() => {
    updateDetail()
  }, [id])

  const updateDetail = async() => {
    console.log(props.detail_id, id)
    if(Number(id) === Number(props.detail_id)) return false;

    if(props.detail_id === null && id) {
      await props.dispatch({ type: 'menu/getDetailInfo', payload: id })
      return false
    }

    await props.dispatch({ type: 'menu/getDetailInfo', payload: id })
  }
  dayjs.extend(localizedFormat)
  const { detail } = props

  return (
    <div className="detail">
      <Helmet encodeSpecialCharacters={false}>
        {/* <html lang="en" data-direction="666" /> */}
        <title>{detail.title}</title>
        <meta name="keywords" content={`${detail.title}`} />
        <meta name="description" content={detail.abstract} />
      </Helmet>
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


Detail.getInitialProps = (async ({ store, isServer, history, match, route }) => {
  if (!isServer) { return }
  await store.dispatch({ type: 'menu/getDetailInfo', payload: match.params.id })
  const { menu } = store.getState()
  return { menu }
})


export default connect((({ menu }) => ({ detail: menu.detail, detail_id: menu.detail_id })))(Detail)