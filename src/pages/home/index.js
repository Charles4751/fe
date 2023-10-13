import React, { useState } from 'react'
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks'
import { useNavigate  } from 'react-router-dom'

import { EMenuItem } from './types'
import { MenuMap } from './constants'

const { Header, Sider, Content } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([EMenuItem.Shop]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setSelectedKeys(selectedKeys)
  }

  const onLogout = useMemoizedFn(() => {
    navigate('/login')
  })

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={onSelect}
          items={[
            {
              key: EMenuItem.Shop,
              icon: <UserOutlined />,
              label: '店铺管理',
            },
            {
              key: EMenuItem.Order,
              icon: <UploadOutlined />,
              label: '订单管理',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px 0 0', background: colorBgContainer, display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button 
            type="primary" 
            shape="circle" 
            icon={<LogoutOutlined />} 
            style={{
              width: 32,
              height: 32,
            }}
            onClick={onLogout}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
          }}
        >
          {MenuMap[selectedKeys[0]]}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index;
