import React, { PureComponent } from 'react'
import Quill from 'quill'
import EditHeader from '../../../component/admin/EditHeader'
import hljs from 'highlight.js';
import emoji from 'quill-emoji'
import { Toast } from 'antd-mobile';

//注册ToolbarEmoji，将在工具栏出现emoji；注册TextAreaEmoji，将在文本输入框处出现emoji。VideoBlot是我自定义的视频组件，后面会讲，
import { uploadFile } from '../../../api/common'
// import { ImageDrop } from './plugin/quill-image-drop-module';
import 'quill-emoji/dist/quill-emoji.css'
import 'highlight.js/styles/darcula.css';
import 'quill/dist/quill.snow.css'
import './style.less'




interface IProps {}
interface IStete {
  richText: any
}
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = emoji

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
    Quill.register({
      'formats/emoji': EmojiBlot,
      // 'formats/video': VideoBlot,
      'modules/emoji-shortname': ShortNameEmoji,
      'modules/emoji-toolbar': ToolbarEmoji,
      'modules/emoji-textarea': TextAreaEmoji,
      // 'modules/ImageExtend': ImageExtend, //拖拽图片扩展组件
      // 'modules/ImageDrop': ImageDrop, //复制粘贴组件
    }, true);
    
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
            ['emoji'],
            ['clean']                                         // remove formatting button
          ],
          handlers: {
            image: this.imageHandle,
            emoji: function() {}
          },
          
        },
        'emoji-toolbar': true,  //是否展示出来
        "emoji-textarea": false, //我不需要emoji展示在文本框所以设置为false
        "emoji-shortname": true,
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
    input.onchange = () => {
        const file = input.files[0]
        const formData = new FormData()
        formData.append('modules[]', '1')
        formData.append('file_type[]', '1')

        formData.append('upload_blog_images[]', file)
        this.uploadFile(formData, (url) => {
          const range = richEdit.getSelection()
          richEdit.insertEmbed(range.index, 'image', url)

        })
        // this part the image is inserted
        // by 'image' option below, you just have to put src(link) of img here. 
        
    }
  }

  /**
   * 上传照片
   * @param upload_blog_images {
   *    modules   表示这个静态资源是属于哪个功能模块的,
   *    file_type 表示静态资源文件类型
   *    file_type 1是图片，2是视频
   * }
   * @param callback 
   */
  uploadFile = async (upload_blog_images: any, callback: any) => {
    const res = await uploadFile(upload_blog_images)
    if(res.code === 0) {
      // 上传 成功
        callback(res.data[0].full_url)
        return true
    } else {
      // 上传失败
      Toast.fail(res.msg, 2)
      return false

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