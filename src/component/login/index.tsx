import { connect } from 'dva';
import React from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import './style.less'


function Login (props: any) {

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

  return (
    <div className="component-login flex">
      <div className="component-login-wrapper flex">
        <CloseOutlined onClick={closeLogin} className='component-login-wrapper--close' />
        <div className="component-login-wrapper--title">Login</div>

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
            <Input placeholder='username' />
          </Form.Item>

          <Form.Item
            className="component-login-wrapper--item flex"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='password' />
          </Form.Item>

          <Form.Item className="component-login-wrapper--item flex">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
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