import React from 'react'
import { useSafeState, useAntdTable } from 'ahooks'
import { Table, Space, Button } from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import { request } from '../../../../service/api'
import { orderStatusMap, categoriesOptions } from '../../../../constants'
import { EOrderStatus } from '../../../../type'

export default function Index(props) {
  const { userId } = useParams();

  const fetchList = async ({ current, pageSize }) => {
    const res = await request('order/getList', {
      userId,
      limit: pageSize,
      offset: current,
    })
    return res
  }

  const { tableProps, refresh } = useAntdTable(fetchList)

  const modifyStatus = async (nextStatus, row) => {
    await request('order/modify', {
      orderId: row._id,
      status: nextStatus,
    })
    refresh()
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '所属店铺',
      dataIndex: 'belongMerchant',
    },
    {
      title: '所属菜品',
      dataIndex: 'belongDish',
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '类别',
      dataIndex: 'category',
      render: (category) => categoriesOptions.find(v => v.value === category)?.label || '-'
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      render: (status) => orderStatusMap[status]
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
    },
    {
      title: '付款时间',
      dataIndex: 'paymentTime',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
    },
    {
      title: '实际付款金额',
      dataIndex: 'realityPrice',
    },
    {
      title: '商家优惠金额',
      dataIndex: 'merchantPreferential',
    },
    {
      title: '平台优惠金额',
      dataIndex: 'platformPreferential',
    },
    {
      title: '实际收入金额',
      dataIndex: 'incomePrice',
    },
    {
      title: '操作',
      dataIndex: '_operate',
      render: (_, row) => {
        return (
          <Space direction="vertical">
            <Button 
              size="middle"
              type="primary" 
              onClick={() => modifyStatus(EOrderStatus.Production, row)}
            >接受订单</Button>
            
            <Button 
              size="middle" 
              type="primary" 
              onClick={() => modifyStatus(EOrderStatus.ToBeDelivered, row)}
            >制作完成</Button>

            <Button 
              size="middle" 
              type="primary" 
              onClick={() => modifyStatus(EOrderStatus.Delivering, row)}
            >配送中</Button>

            <Button 
              size="middle" 
              danger
              onClick={() => modifyStatus(EOrderStatus.Rejected, row)}
            >拒绝订单</Button>

            <Button 
              size="middle" 
              danger
              onClick={() => modifyStatus(EOrderStatus.Rejected, row)}
            >发起收款</Button>
          </Space>
        )
      }
    },
  ]

  return (
    <Table scroll={{
      x: 1600,
      y: 500,
    }} rowKey="_id" columns={columns} { ...tableProps } />
  )
}
