import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { useParams } from 'react-router-dom';

import { request } from '../../../../service/api'
import { categoriesOptions } from './constants'

export default function Index(props) {
  const [form] = Form.useForm()
  const { userId } = useParams()

  const modalProps = {
    ...props,
    destroyOnClose: true,
    title: '创建店铺',
    onOk: () => {
      form.validateFields().then(async values => {
        form.resetFields()
        await request('merchants/create', {
          userId,
          ...values
        })
        message.success('创建商铺成功')
        props.onOk()
      })
    }
  }

  return (
    <Modal {...modalProps}>
      <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
        <Form.Item 
          name="merchantName" 
          label="店铺名称"
          rules={[{ required: true, message: '请输入店铺名称' }]}
        >
          <Input placeholder='请输入店铺名称' />
        </Form.Item>

        <Form.Item 
          name="merchantPhoneNumber" 
          label="电话"
          rules={[{ required: true, message: '请输入电话' }]}
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>

        <Form.Item 
          name="merchantAddress" 
          label="地址"
          rules={[{ required: true, message: '请输入地址' }]}
        >
          <Input placeholder='请输入详细地址' />
        </Form.Item>

        <Form.Item 
          name="category" 
          label="类别"
          rules={[{ required: true, message: '请选择类别' }]}
        >
          <Select placeholder="请选择店铺类别" options={categoriesOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
