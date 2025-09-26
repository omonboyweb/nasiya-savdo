import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const SuperAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          padding: "20px 10px 10px 10px",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/super-admin/admins"]}
          items={[
            {
              key: "/super-admin/admins",
              icon: <UserOutlined />,
              label: <Link to={"/super-admin/admins"}>Admins</Link>,
            },
            {
              key: "/super-admin/store",
              icon: <VideoCameraOutlined />,
              label: <Link to="/super-admin/store">Sellers</Link>,
            },
            {
              key: "/super-admin/debtor",
              icon: <UploadOutlined />,
              label: <Link to="/super-admin/debtor">Debtor</Link>,
            },
          ]}
        />
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
            overflowY: "auto", // vertikal scroll
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuperAdmin;
