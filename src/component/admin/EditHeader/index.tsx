import React, { useEffect, useState } from 'react'

import './style.less'

function EditHeader (props: any) {

  const [ title, setTitle ] = useState('')
  const [ imgurl, setImgurl ] = useState('')
  const [ summary, setSummary ] = useState('')
  const [ author, setAuthor ] = useState('')

  return (
    <div className="admin-component-editHeader">
      header
    </div>
  )
}

export default EditHeader;