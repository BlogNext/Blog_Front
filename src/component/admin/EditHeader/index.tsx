import React, { useEffect, useState } from 'react'
import { BarsOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './style.less'
import { Button } from 'antd';

function EditHeader (props: any) {

  const [ title, setTitle ] = useState('')
  const [ imgurl, setImgurl ] = useState('')
  const [ summary, setSummary ] = useState('')
  const [ author, setAuthor ] = useState('')

  return (
    <div className="admin-component-editHeader flex">
      <div className="admin-component-editHeader-left flex">
        <BarsOutlined className="admin-component-editHeader-left-menu" />

        <div className="admin-component-editHeader-left-tag">请选择标签</div> /
        <div className="admin-component-editHeader-left-title">无标题</div>
        <div className="admin-component-editHeader-left-info">
          <ExclamationCircleOutlined />
        </div>
        <div className="admin-component-editHeader-left-record">最后更改于今天{new Date().toLocaleTimeString()}</div>
      </div>
        
      <div className="admin-component-editHeader-right">
        <Button onClick={props.onSubmit} className="admin-component-editHeader-right-submit" type="primary">发布</Button>
      </div>
    </div>
  )
}

export default EditHeader;