"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  InboxOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/", icon: <DashboardOutlined /> },
    { label: "Projects", href: "/projectView", icon: <ProjectOutlined /> },
    { label: "Inventory", href: "/issues/list", icon: <InboxOutlined /> },
    { label: "Workforce", href: "/workforce", icon: <TeamOutlined /> },
  ];

  return (
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
  );
};

export default NavBar;
