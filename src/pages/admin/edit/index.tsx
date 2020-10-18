import React, { PureComponent } from 'react'
import Quill from 'quill'
import EditHeader from '../../../component/admin/EditHeader'
import 'quill/dist/quill.snow.css'
import './style.less'


interface IProps {}
interface IStete {
  richText: any
}

class Edit extends PureComponent<IProps, IStete> {
  constructor(props: any) {
    super(props)
    this.state = {
      richText: null
    }
  }

  componentDidMount = () => {
    this._initRickEdit()
  }

  _initRickEdit = () => {
    let options = {
      debug: 'info',
      modules: {
        toolbar:  [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
        
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
        
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
        
          ['clean']                                         // remove formatting button
        ],
      },
      placeholder: 'Compose an epic...',
      // readOnly: true,
      theme: 'snow',
    };
    this.setState({
      richText: new Quill('#admin-edit-richtext', options)
    })
  }

  render() {
    return(
      <div className="admin-edit">
        <EditHeader />
        <div className="admin-edit-richtext" id='admin-edit-richtext'>

        </div>
      </div>
    )
  }
}


export default Edit