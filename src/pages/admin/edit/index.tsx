import React, { PureComponent } from 'react'
import Quill from 'quill'
import EditHeader from '../../../component/admin/EditHeader'
import hljs from 'highlight.js';

import { uploadFile } from '../../../api/common'

import 'highlight.js/styles/darcula.css';
import 'quill/dist/quill.snow.css'
import './style.less'
import { Toast } from 'antd-mobile';




interface IProps {}
interface IStete {
  richText: any
}

class Edit extends PureComponent<IProps, IStete> {
  richText: any;
  constructor(props: any) {
    super(props)
    this.richText = React.createRef();
    this.state = {
      richText: null
    }
  }

  

  componentDidMount = () => {
    
    this._initRickEdit()
  }

  _initRickEdit = () => {
    hljs.configure({   // optionally configure hljs
      languages: ['javascript', 'php', 'python']
    });
    let options = {
      debug: 'false',
      modules: {
        syntax:  {
          highlight: (text: string) => hljs.highlightAuto(text).value,
        },
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],     
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']                                         // remove formatting button
          ],
          handlers: {
            image: this.imageHandle
          }
        }
      },
      
      placeholder: 'Write something...',
      // readOnly: true,
      theme: 'snow',
    };

    // _init richtext
    this.richText = new Quill('#admin-edit-richtext', options)
  }


  // 照片icon 点击处理
  imageHandle = () => {

    let richEdit = this.richText
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
        const file = input.files[0]
        const formData = new FormData()
        formData.append('modules', '1')
        formData.append('upload_blog_images', file)
        const res = this.uploadFile(formData) 
        const range = richEdit.getSelection()
        // const link = res.data[0].url

        // this part the image is inserted
        // by 'image' option below, you just have to put src(link) of img here. 
        // richEdit.insertEmbed(range.index, 'image', link)
    }
  }

  // 上传照片
  uploadFile = async (upload_blog_images: any) => {
    const res = await uploadFile(upload_blog_images)
    if(res.code === 0) {
      // 上传 成功


    } else {
      // 上传失败
      Toast.fail(res.message, 2, () => {
        return false
      })
    }
  }

  getRichContent = () => {
    console.log(this.richText.container.firstChild.innerHTML)
  }

  render() {
    return(
      <div className="admin-edit flex">
        <EditHeader onSubmit={this.getRichContent} />
        <div className="admin-edit-content flex">
          <div className="admin-edit-content-richtext" id='admin-edit-richtext' ref={this.richText}> </div>
        </div>
      </div>
    )
  }
}


export default Edit