import React, { Component } from 'react';
import { Button, Form, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './style.less'
import { transform } from 'lodash';



const neutral = require('../../../assets/img/login/neutral.png')
const active = require('../../../assets/img/login/active.png')
const ecstatic = require('../../../assets/img/login/ecstatic.png')
const peek = require('../../../assets/img/login/peek.png')
const shy = require('../../../assets/img/login/shy.png')

interface IProps {}
interface IState {
  email: string,
  password: string,
  showPassword: boolean,
  style: any
}
export default class Login extends Component<IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      style: {
        backgroundImage: `url('${neutral}')`
      }
    }
  }
  onFinish = () => {

  }

  onFinishFailed = () => {

  }

  // 聚焦、值变更 => 小熊状态改变
  onFocusHandle = (type: string) => {
    console.log(type)
    const { email, password } = this.state
    if(type === 'email') {
      this.onChangeHandle('email', email)
    } else {
      // password onBlur
      this.onChangeHandle('password', password)

    }
  }

  validateEmail = (email: string) => {
    let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/

    if(reg.test(email)) {
      return true
    } else {
      return false
    }
  }



  // 输入框值 处理
  onChangeHandle = (type: string, value: any) => {
    const { email, showPassword } = this.state
    if (type === 'email') {
      this.setState({
        email: value
      }, () => {
        if(email.length > 5) {
          //说明有值
          let isEmail = this.validateEmail(email)
          console.log()
          if(isEmail) {
            // 已经符合邮箱的格式
            this.setState({ style: {backgroundImage: `url('${ecstatic}')`} })
          } else if(email.indexOf('@')) {
            this.setState({ style: {backgroundImage: `url('${active}')`} })
          }
        } else {
          this.setState({ style: {backgroundImage: `url('${neutral}')`} })
        }
      })
    } else {
      this.setState({ password: value,style: {backgroundImage: `url('${showPassword ? peek : shy}')`}})
    }
  }

  passwordStatusHandle = (showPassword: boolean) => {
    console.log(2222)
    this.setState({
      showPassword
    })
  }


  render () {
    const { email, password, style, showPassword } = this.state
    return(
      <div className="admin-login flex">
        <div className="admin-login-wrapper flex">
          <div className="admin-login-wrapper-title">Login</div>
          <div
            className="admin-login-wrapper-bear"
          >
            <div style={{ ...style}} className="admin-login-wrapper-bear-content"></div>
          </div>
          <div className="admin-login-wrapper-form">
            <Form
              // {...layout}
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input onFocus={() => this.onFocusHandle('email')} value={email} onChange={(e) => this.onChangeHandle('email', e.target.value)} type='text' placeholder='Email' />
              </Form.Item>
  
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  value={password}
                  type={!showPassword ? 'password' : 'text'}
                  onFocus={() => this.onFocusHandle('password')} 
                  onChange={(e) => this.onChangeHandle('pass',  e.target.value)}  placeholder='Password'
                  suffix={showPassword ? <EyeTwoTone onClick={() => this.passwordStatusHandle(false)} /> : <EyeInvisibleOutlined onClick={() => this.passwordStatusHandle(true)} />}
                  // iconRender={() => (showPassword ? <EyeTwoTone onClick={() => this.passwordStatusHandle(false)} /> : <EyeInvisibleOutlined onClick={() => this.passwordStatusHandle(true)} />)}
                />
              </Form.Item>
  
  
              <Form.Item className='flex'>
                <Button className='admin-login-wrapper-form-submit' type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
  
          <div className="admin-login-wrapper-tools"></div>
        </div>
      </div>
    )
  }
}