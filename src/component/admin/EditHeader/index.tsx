import React, { useEffect, useState } from 'react'
import { BarsOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './style.less'
import { Button, Input, Popover, Upload, Select } from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { uploadFile } from '../../../api/common'
import { Toast } from 'antd-mobile';

function EditHeader (props: any) {
  const [ showTitle, setShowTitle ] = useState(false)
  const [ showTagSelect, setShowTagSelect ] = useState(false)
  const [ visible, setVisible ] = useState(false)

  const tagList = JSON.parse(localStorage.getItem('blog_tags'))

  useEffect(() => {
    console.log('init children')
    // _initInfo()
  }, [props.title, props.abstract, props.tag, props.author, props.bg_info])


  const onSelectChange = (e: any) => {
    const res = tagList.find((item: any) => {
      return item.id === e
    })
    props.change('tag', res)
  }

  const titleStatusChange = (e: any, status = true) => {
    setShowTitle(status)
  }

  const tagStatusChange = (e: any, status = true) => {
    setShowTagSelect(status)
  }

  const visibleChange = (e: any, status = true) => {
    setVisible(status)
  }



  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const updatePicFile = async(e: any) => {
    console.log(e.file)
    const file = e.file
    const formData = new FormData()
    formData.append('modules[]', '1')
    formData.append('file_type[]', '1')

    formData.append('upload_blog_images[]', file)
    const res = await uploadFile(formData)
    if(res.code === 0) {
      Toast.success(res.msg, 1, () => {
        const filedata = [
          {
            uid: res.data[0].id,
            url: res.data[0].full_url,
          }
        ]
        props.change('bg_info', filedata)
      })
    }
  }

  // info 点击显示内容 （摘要，背景图）
  const popoverContent = (
    <div className='admin-component-editHeader-left-popContent'>
      <div className="admin-component-editHeader-left-popContent-summary">
        <p>摘要</p>
        <Input.TextArea onChange={(e: any) => props.change('abstract', e.target.value)} value={props.abstract} placeholder='请输入文章摘要' />
      </div>
      <div className="admin-component-editHeader-left-popContent-pic">
        <p>封面</p>
        {/* <ImgCrop rotate> */}
          <Upload
            listType="picture-card"
            fileList={props.bg_info}
            customRequest={(e) => updatePicFile(e)}
            // onChange={onChange}
            onPreview={onPreview}
          >
            {props.bg_info.length < 1 && '+ Upload'}
          </Upload>
        {/* </ImgCrop> */}
      </div>

      <Input disabled className="admin-component-editHeader-left-popContent-author" onChange={(e: any) => props.change('author', e.target.value)} value={props.author} placeholder="请输入作者" />
      <Button onClick={(e) => visibleChange(e, false)} className="admin-component-editHeader-left-popContent-submit" type="primary">确定</Button>

    </div>
  )

  const popoverTitle = (
    <div className='admin-component-editHeader-left-popoTitle'> {props.length} <span>字</span> </div>
  )

  const tagSelectContent = () => {
    const tagContent = tagList.map((item: any) => {
      return (
        <Select.Option value={item.id} key={'select-option-' + item.id}> {item.title} </Select.Option>
      )
    })
    return (
      <Select onChange={(e) => onSelectChange(e)} onBlur={(e) => tagStatusChange(e, false)} value={props.tag.id ? props.tag.id : null} style={{ width: 120 }} bordered={false}>
        { tagContent }
      </Select>
    )
  }


  return (
    <div className="admin-component-editHeader flex">
      <div className="admin-component-editHeader-left flex">
        <BarsOutlined className="admin-component-editHeader-left-menu flex" />

        { showTagSelect ? (
          tagSelectContent()
        ) : (
          <div onClick={tagStatusChange} className="admin-component-editHeader-left-tag">{props.tag.title ? props.tag.title : '请选择标签'}</div>
        )} 
        /
        <div className="admin-component-editHeader-left-title" ></div>
        { showTitle ? (
          <Input type='text' onBlur={(e) => titleStatusChange(e, false)} onChange={(e: any) => props.change('title', e.target.value)} value={props.title} placeholder="请输入文章标题" />
        ) : (
          <div className="admin-component-editHeader-left-title" onClick={titleStatusChange}>{ props.title }</div>
        )}
        
        <Popover visible={visible} content={popoverContent} title={popoverTitle} trigger="click">
          <div className="admin-component-editHeader-left-info" onClick={visibleChange}>
            <ExclamationCircleOutlined />
          </div>
        </Popover>
        <div className="admin-component-editHeader-left-record">最后更改于今天{new Date().toLocaleTimeString()}</div>
      </div>
        
      <div className="admin-component-editHeader-right">
        <Button onClick={props.onSubmit} className="admin-component-editHeader-right-submit" type="primary">发布</Button>
      </div>
    </div>
  )
}

export default EditHeader;