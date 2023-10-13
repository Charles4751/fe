import React, { useRef } from 'react'
import { useSafeState, useAntdTable } from 'ahooks'
import { Layout, Button, Table, Space, message, Typography } from 'antd'
import { useNavigate, useParams } from "react-router-dom";

import { AddDish, EditDish } from './components'
import { request } from '../../service/api'
import { EDishStatus } from '../../type'
import { categoriesOptions, dishStatusMap } from '../../constants'

const { Header, Content } = Layout
const { Title } = Typography;

const Index = () => {
  const [openCreate, setOpenCreate] = useSafeState(false)
  const [openEdit, setOpenEdit] = useSafeState(false)
  const { userId, merchantId } = useParams();
  const navigate = useNavigate();
  const [currentDish, setCurrentDish] = useSafeState(null)

  const fetchList = async ({ current, pageSize }) => {
    const res = await request('dish/getList', {
      merchantId,
      limit: pageSize,
      offset: current,
    })
    return res
  }

  const { tableProps, refresh } = useAntdTable(fetchList)

  const onBack = () => {
    navigate(`/${userId}`)
  }

  const handleOk = () => {
    setOpenCreate(false)
    setOpenEdit(false)
    refresh()
  }

  const modifyDishStatus = (status, row) => {
    request('dish/modifyStatus', {
      dishId: row._id,
      status
    }).then(() => {
      message.success('操作成功')
      refresh()
    })
  }

  const modifyDish = (row) => {
    setCurrentDish(row)
    setOpenEdit(true)
  } 

  const columns = [
    {
      title: '菜品名称',
      dataIndex: 'dishName'
    },
    {
      title: '菜品种类',
      dataIndex: 'category',
      render: (category) => categoriesOptions.find(item => item.value === category)?.label || '-'
    },
    {
      title: '售价',
      dataIndex: 'price',
      render: (price) => `${price}￥`
    },
    {
      title: '优惠价',
      dataIndex: 'preferential',
      render: (preferential) => `${preferential}￥`
    },
    {
      title: '库存',
      dataIndex: 'inventory',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => dishStatusMap[status]
    },
    {
      title: '操作',
      dataIndex: '_operate',
      render: (_, row) => {
        return (
          <Space>
            <Button size="middle" type="primary" onClick={() => modifyDish(row)}>修改</Button>
            <Button size="middle" type="primary" onClick={() => modifyDishStatus(EDishStatus.Sale, row)}>上架</Button>
            <Button size="middle" danger onClick={() => modifyDishStatus(EDishStatus.OffShelf, row)}>下架</Button>
          </Space>
        )
      }
    },
  ]

  return (
    <>
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button size="middle" type="primary" onClick={onBack}>返回</Button>
            <Title level={4} style={{color: '#fff', margin: '0 0 0 16px'}}>菜品列表</Title>
          </div>
          <Button size="middle" type="primary" onClick={() => setOpenCreate(true)}>添加</Button>
        </Header>

        <Content>
          <Table rowKey="_id" columns={columns} { ...tableProps } />
        </Content>
      </Layout>

      <AddDish 
        open={openCreate} 
        onCancel={() => setOpenCreate(false)} 
        onOk={handleOk} 
      />

      {
        openEdit ? (
          <EditDish
            open={true} 
            onCancel={() => setOpenEdit(false)} 
            onOk={handleOk} 
            dishId={currentDish?._id}
          />
        ) : null
      }
      
    </>
  )
}

export default Index;
