import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { useUpdateEffect } from 'ahooks'

import { request } from '../../../../service/api'
import { categoriesOptions } from '../../../../constants'

export default function Index(props) {
  const { dishId } = props
  const [form] = Form.useForm()

  const modalProps = {
    ...props,
    title: '编辑菜品',
    onOk: () => {
      form.validateFields().then(async values => {
        form.resetFields()
        await request('dish/modify', {
          ...values,
          dishId,
        })
        message.success('编辑成功')
        props.onOk()
      })
    }
  }

  useEffect(() => {
    (async () => {
      if (dishId) {
        const res = await request('dish/getDetailByDishId', {
          dishId
        })
        form.setFieldsValue(res)
      }
    })()
  }, [dishId])

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
