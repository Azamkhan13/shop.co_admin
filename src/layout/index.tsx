import React, { useEffect, useState } from "react";
import './style.css'
import {
  DiffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import http from "../config";

const { Header, Sider, Content } = Layout;



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()

  async function checkToken(){
    const response = await http.get('/admin/profile')
    if(response?.status != 200){
      navigate('/')
    }
  }

  useEffect(() => {
    checkToken()
  }, [])



  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div style={{padding: 30, display: 'flex', flexDirection: 'column', gap: 20}}>
            <div onClick={() => navigate('/dashboard')} style={{display: 'flex', alignItems: 'center', color: 'white', gap: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              <ProductOutlined style={{fontSize: 20}}/>
              <p className={`${collapsed && 'menu-btn'}`}>Products</p>
            </div>
            <div onClick={() => navigate('categories')} style={{display: 'flex', alignItems: 'center', color: 'white', gap: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            <DiffOutlined  style={{fontSize: 20}}/>
            <p className={`${collapsed && 'menu-btn'}`}>Categories</p>
            </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
