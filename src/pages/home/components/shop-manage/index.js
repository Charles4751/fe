import React, { useRef } from 'react'
import { useSafeState, useAntdTable, useCreation } from 'ahooks'
import { Layout, Button, Table, Space, Popconfirm, message } from 'antd'
import { useNavigate, useParams } from "react-router-dom";

import { CreateShop, EditShop } from '..'
import { request } from '../../../../service/api'
import { categoriesOptions } from '../../constants'

const { Header, Content } = Layout

const Index = () => {
  const [openCreate, setOpenCreate] = useSafeState(false)
  const [openEdit, setOpenEdit] = useSafeState(false)
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentMerchant = useRef(null)

  const onCreate = () => {
    setOpenCreate(true)
  }

  const onEdit = (row) => {
    console.log("%c Line:24 🥐 row", "color:#6ec1c2", row);
    currentMerchant.current = row
    setOpenEdit(true)
  }

  const fetchList = async ({ current, pageSize }) => {
    const res = await request('merchants/getList', {
      userId,
      limit: pageSize,
      offset: current,
    })
    return res
  }

  const { tableProps, refresh } = useAntdTable(fetchList)

  const gotoDetail = (row) => {
    navigate(`/dish/${userId}/${row._id}`)
  }

  const handleOk = () => {
    setOpenCreate(false)
    setOpenEdit(false)
    refresh()
  }

  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'merchantName'
    },
    {
      title: '地址',
      dataIndex: 'merchantAddress',
    },
    {
      title: '电话',
      dataIndex: 'merchantPhoneNumber'
    },
    {
      title: '类别',
      dataIndex: 'category',
      render: (category) => categoriesOptions.find(item => item.value === category)?.label || '-'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, row) => {
        return (
          <Space>
            <Button size="middle" onClick={() => gotoDetail(row)}>详情</Button>
            <Button size="middle" type="primary" onClick={() => onEdit(row)}>编辑</Button>
            <Popconfirm
              title="确认删除当前商铺？"
              description="删除操作不可逆，确认删除？"
              onConfirm={async () => {
                await request('merchants/delete', {
                  merchantId: row._id,
                })
                refresh()
                message.success('操作成功')
              }}
            >
              <Button size="middle" danger>删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ]

  return (
    <>
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{ display: 'flex', justifyContent:'flex-end', alignItems: 'center' }}>
          <Button size="middle" type="primary" onClick={onCreate}>创建</Button>
        </Header>

        <Content>
          <Table rowKey="_id" columns={columns} { ...tableProps } />
        </Content>
      </Layout>

      <CreateShop open={openCreate} onCancel={() => setOpenCreate(false)} onOk={handleOk} />

      {
        openEdit && (
          <EditShop 
            open={openEdit} 
            onCancel={() => setOpenEdit(false)} 
            onOk={handleOk} 
            merchantId={currentMerchant.current?._id} 
          />
        )
      }
    </>
  )
}

export default Index;
