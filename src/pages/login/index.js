import React, { useState } from 'react'
import { Typography, Input, Form, Button, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import * as CryptoJS from 'crypto-js'

import { request } from '../../service/api'
import style from './index.module.css'

const { Title } = Typography;

const initialValuesLogin = {
  phoneNumber: 13912345678,
  password: '123456',
}
const initialValuesRegister = {
  userName: '',
  name: '',
  email: '',
  phoneNumber: null,
  password: '',
}

const Index = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);

  const handleLogin = async (formValues) => {
    const res = await request('auth/login', formValues)
    if (res?._id) {
      navigate(`/${res._id}`);
    }
  }

  const handleRegister = async (formValues) => {
    const res = await request('auth/register', formValues)
    if (res?._id) {
      navigate(`/${res._id}`);
    }
  }

  const onLogin = async () => {
    try {
      await form.validateFields()
      const { 
        password,
        phoneNumber,
        ...restValue
      } = form.getFieldsValue();

      const encrypted = CryptoJS.AES.encrypt(password, 'secret key').toString()
      const callback = register ? handleRegister : handleLogin;
      callback({
        phoneNumber: +phoneNumber,
        ...restValue,
        password: encrypted,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onRegister = () => {
    setRegister(true);
    form.setFieldsValue(initialValuesRegister);
  }

  const renderLogin = (
    <>
      <Form.Item 
        name="phoneNumber" 
        label="账号"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input placeholder='请输入手机号或邮箱' />
      </Form.Item>
      <Form.Item 
        name="password" 
        label="密码" 
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type="password" placeholder='请输入密码' />
      </Form.Item>
    </>
  )

  const renderRegister = (
    <>
      <Form.Item 
        name="nickName" 
        label="昵称" 
        rules={[{ required: true, message: '请输入昵称' }]}
      >
        <Input placeholder='请输入昵称' />
      </Form.Item>

      <Form.Item 
        name="username" 
        label="姓名" 
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input placeholder='请输入姓名' />
      </Form.Item>

      <Form.Item 
        name="phoneNumber" 
        label="手机号" 
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        <Input placeholder='请输入手机号' />
      </Form.Item>

      <Form.Item 
        name="email" 
        label="邮箱" 
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input placeholder='请输入邮箱' />
      </Form.Item>

      <Form.Item 
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type="password" placeholder='请输入密码' />
      </Form.Item>
    </>
  )

  return (
    <div className={style.container}>
      <Title>基于Node的订餐管理系统的设计与实现</Title>

      <div className={style.form}>
        <Form 
          form={form} 
          name="basic" 
          initialValues={initialValuesLogin} 
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}   
        >
          {
            register ? renderRegister : renderLogin
          }

          <Form.Item labelCol={0} wrapperCol={24}>
            <Row gutter={16}>

              {
                !register ? (
                  <Col span={12}>
                    <Button block danger type="primary" onClick={onRegister}>注册</Button>
                  </Col>
                ) : (
                  <Col span={12}>
                    <Button block danger type="primary" onClick={() => setRegister(false)}>取消</Button>
                  </Col>
                )
              }

              <Col span={12}>
                <Button block type="primary" onClick={onLogin}>登录</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Index;
