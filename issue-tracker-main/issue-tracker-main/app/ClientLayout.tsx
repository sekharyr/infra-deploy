"use client";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Row, Col, Layout, theme, Input, Avatar } from "antd";
import NavBar from "./NavBar";
import CreateButton from "./CreateButton";
import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  InboxOutlined,
  TeamOutlined,
} from "@ant-design/icons";
const { Header, Content, Sider, Footer } = Layout;

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/", icon: <DashboardOutlined /> },
    { label: "Projects", href: "/projectView", icon: <ProjectOutlined /> },
    // { label: "Inventory", href: "/issues/list", icon: <InboxOutlined /> },
    { label: "Workforce", href: "/workforce", icon: <TeamOutlined /> },
  ];

  return (
    <Layout className="layout">
      <Header className="header">
        <Row align="middle" className="header-row" justify="space-between">
          <Col>
            <Link href="/" className="bug-icon-link">
              <DeploymentUnitOutlined className="bug-icon" />
              {/* <AiFillBug className="bug-icon" /> */}
              <span className="logo-text">NexSite</span>
            </Link>
          </Col>

          <Col flex="1" className="search-col">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              className="search-input"
            />
          </Col>

          <Col>
            <Row align="middle" gutter={16}>
              <Col>
                <CreateButton />
              </Col>
              <Col>
                <Avatar size="large" icon={<UserOutlined />} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>

      <Layout className="main-layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={200}
          className="sider"
        >
          {/* <NavBar /> */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[currentPath]}
            // style={{ height: "100%" }}
          >
            {links.map((link) => (
              <Menu.Item key={link.href} icon={link.icon}>
                <Link href={link.href}>{link.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        {/* <Layout className="content-layout"> */}
        <Content
          className="content"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
      {/* </Layout> */}
      <Footer
        style={{
          textAlign: "right",
          padding: "8px 16px",
          lineHeight: "1.2",
        }}
      >
        ©NexSite 2024v1.1
      </Footer>
    </Layout>
  );
};

export default ClientLayout;
