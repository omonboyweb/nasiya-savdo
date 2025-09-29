import React, { useState } from "react";
import {
  FileDoneOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayouts: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="side-admin"
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{ fontSize: "18px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin/stores"]}
          items={[
            {
              key: "/admin/stores",
              icon: <ShopOutlined />,
              label: <Link to={"/admin/stores"}>Stores</Link>,
            },
            {
              key: "/admin/debtors",
              icon: <FileTextOutlined />,
              label: <Link to={"/admin/debters"}>Debters</Link>,
            },
            {
              key: "/admin/debts",
              icon: <FileDoneOutlined />,
              label: <Link to={"/admin/debts"}>Debts</Link>,
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

export default AdminLayouts;
