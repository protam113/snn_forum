import React from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AdNav } from "./nav";

const { Header } = Layout;

const AdHeader = ({ collapsed, setCollapsed }) => {
  return (
    <Header className="bg-main-blue2 p-0">
      <div className="flex justify-between items-center">
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
        <div className="flex items-center">
          {/* Logo or Title can go here if needed */}
          <h1 className="text-lg font-semibold text-white">H2H Dashboard</h1>
        </div>
        <AdNav />
      </div>
    </Header>
  );
};

export default AdHeader;
