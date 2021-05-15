import { connect } from 'dva';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import oauthSdk from '@laughingzhu/oauthsdk'

import './style.less'


function Login (props: any) {

  const [type, setType] = useState(0)


  const onFinish = values => {
    console.log('Success:', values);
    props.dispatch({
      type: 'menu/toLogin',
      payload: {...values}
    })
  };

  const closeLogin = () => {
    props.dispatch({
      type: 'menu/changeLoginStatus',
      payload: {status: false}
    })
  }

  const onBlur = (type: number) => {
    setType(type)
  }

  const onFocus = (type: number) => {
    setType(type)
  }

  // 第三方登录
  const otherLogin = () => {
    new oauthSdk('blog_1616644960', 'https://blog.laughingzhu.cn/front/login/login_blog_next_pre_code')._init()
  }

  // const 

  return (
    <div className="component-login flex">
      <div className="component-login-wrapper flex">
        <img src={require('../../assets/img/login/normal.png')} alt="" className={`component-login-wrapper-carton component-login-wrapper-carton--normal ${type !== 0 && 'hidden'}`}/>
        <img src={require('../../assets/img/login/greeting.png')} alt="" className={`component-login-wrapper-carton component-login-wrapper-carton--greeting ${type !== 1 && 'hidden'}`}/>
        <img  src={require('../../assets/img/login/blindfold.png')} alt="" className={`component-login-wrapper-carton component-login-wrapper-carton--blindfold ${type !== 2 && 'hidden'}`}/>
        <div className="component-login-wrapper-top flex">
          <div className="component-login-wrapper-top--title">账密登录</div>
          <CloseOutlined onClick={closeLogin} className='component-login-wrapper-top--close' />
        </div>

        <Form
          name="basic"
          style={{ width: '100%'}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className="component-login-wrapper--item flex"
            name="login"
            
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onFocus={() => onFocus(1)} onBlur={() => onBlur(0)} placeholder='username' />
          </Form.Item>

          <Form.Item
            className="component-login-wrapper--item flex"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onFocus={() => onFocus(2)} onBlur={() => onBlur(0)} placeholder='password' />
          </Form.Item>

          <Form.Item className="component-login-wrapper--item flex">
            <Button type='primary' htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>


        </Form>

        <div className="component-login-wrapper-oauth flex">
          <div className="component-login-wrapper-oauth-item flex" onClick={otherLogin}>
            <img src={require('../../assets/img/logo_tou.png')} alt=""/>
          </div>
        </div>

        <div className="component-login-wrapper-footer flex">
          注册登录即表示同意 <span> 用户协议</span> 、 <span>隐私政策</span>
        </div>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  const { loginStatus } = state.menu;
  return {
    loading: state.loading.models.menu,
    loginStatus
  };
}
export default connect(mapStateToProps)(Login);