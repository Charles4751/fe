import React from 'react'
import { useSafeState, useAntdTable } from 'ahooks'
import { Table, Space, Button, Statistic, message } from 'antd'
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
    message.success('操作成功')
    refresh()
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 120
    },
    {
      title: '所属店铺',
      dataIndex: 'belongMerchant',
      width: 120
    },
    {
      title: '所属菜品',
      dataIndex: 'belongDish',
      width: 120
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 120
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 120
    },
    {
      title: '类别',
      dataIndex: 'category',
      render: (category) => categoriesOptions.find(v => v.value === category)?.label || '-',
      width: 120
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      render: (status) => orderStatusMap[status],
      width: 120
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      width: 150
    },
    {
      title: '付款时间',
      dataIndex: 'paymentTime',
      width: 150
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      width: 140,
      align: 'right',
      render: (price) => (
        <Statistic
          value={price}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          suffix="￥"
        />
      )
    },
    {
      title: '实际付款金额',
      dataIndex: 'realityPrice',
      width: 140,
      align: 'right',
      render: (realityPrice) => (
        <Statistic
          value={realityPrice}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          suffix="￥"
        />
      )
    },
    {
      title: '商家优惠金额',
      dataIndex: 'merchantPreferential',
      width: 140,
      align: 'right',
      render: (merchantPreferential) => (
        <Statistic
          value={merchantPreferential}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          suffix="￥"
        />
      )
    },
    {
      title: '平台优惠金额',
      dataIndex: 'platformPreferential',
      width: 140,
      align: 'right',
      render: (platformPreferential) => (
        <Statistic
          value={platformPreferential}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          suffix="￥"
        />
      )
    },
    {
      title: '实际收入金额',
      dataIndex: 'incomePrice',
      width: 140,
      align: 'right',
      render: (incomePrice) => (
        <Statistic
          value={incomePrice}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          suffix="￥"
        />
      )
    },
    {
      title: '操作',
      dataIndex: '_operate',
      fixed: 'right',
      width: 130,
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
