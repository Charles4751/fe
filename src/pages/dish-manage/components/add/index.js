import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { useParams } from 'react-router-dom';

import { request } from '../../../../service/api'
import { categoriesOptions } from '../../../../constants'

export default function Index(props) {
  const [form] = Form.useForm()
  const { merchantId } = useParams()

  const modalProps = {
    ...props,
    destroyOnClose: true,
    title: '添加菜品',
    onOk: () => {
      form.validateFields().then(async values => {
        form.resetFields()
        await request('dish/add', {
          ...values,
          merchantId,
        })
        message.success('添加成功')
        props.onOk()
      })
    }
  }

  return (
    <Modal {...modalProps}>
      <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
        <Form.Item 
          name="dishName" 
          label="菜品名称"
          rules={[{ required: true, message: '请输入菜品名称' }]}
        >
          <Input placeholder='请输入菜品名称' />
        </Form.Item>

        <Form.Item 
          name="category" 
          label="菜品种类"
          rules={[{ required: true, message: '请选择菜品种类' }]}
        >
          <Select placeholder="请选择菜品种类" options={categoriesOptions} />
        </Form.Item>

        <Form.Item 
          name="price" 
          label="售价"
          rules={[{ required: true, message: '请输入售价' }]}
        >
          <Input placeholder='请输入售价' />
        </Form.Item>

        <Form.Item 
          name="preferential" 
          label="优惠价"
          rules={[{ required: true, message: '请输入优惠价' }]}
        >
          <Input placeholder='请输入优惠价' />
        </Form.Item>

        <Form.Item 
          name="inventory" 
          label="库存"
          rules={[{ required: true, message: '请输入库存' }]}
        >
          <Input placeholder="请输入库存" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
