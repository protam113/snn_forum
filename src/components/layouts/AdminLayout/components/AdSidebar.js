import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TagsOutlined,
  PictureOutlined,
  UserOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  SolutionOutlined,
  ShoppingOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Logo from "../../../../assets/img/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserProvider";

const { Sider } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    path,
    children,
    label,
  };
}

const Sidebar = ({ collapsed }) => {
  const { userRoles } = useUser();
  const navigate = useNavigate();

  // Define items with paths
  const items = [
    getItem("Dashboard", "1", <DashboardOutlined />, "/admin"),
    getItem("Categories", "2", <TagsOutlined />, "/admin/the_loai"),
    getItem("Tags", "3", <TagsOutlined />, "/admin/tag"),
    getItem("Banners", "4", <PictureOutlined />, "/admin/banners"),
    ...(userRoles.includes("admin")
      ? [
          getItem(
            "Users",
            "5",
            <UsergroupAddOutlined />,
            "/admin/quan_ly_nguoi_dung"
          ),
          getItem(
            "Web Info",
            "12",
            <FileTextOutlined />,
            "/admin/thong_tin_web"
          ),
        ]
      : []),
    getItem("Statistics", "sub1", <BarChartOutlined />, null, [
      getItem("Bài Viết", "6", <FileOutlined />, "/admin/thong_ke/blog"),
      getItem(
        "Danh Mục Sản Phẩm",
        "7",
        <TagsOutlined />,
        "/admin/thong_ke/the_loai"
      ),
      getItem(
        "Sản Phẩm Theo Danh Mục",
        "8",
        <ShoppingOutlined />,
        "/admin/thong_ke/san_pham"
      ),
      getItem(
        "Đơn Ứng Tuyển",
        "9",
        <SolutionOutlined />,
        "/admin/thong_ke/don_ung_tuyen"
      ),
      getItem(
        "Ứng Tuyển",
        "10",
        <PieChartOutlined />,
        "/admin/thong_ke/ung_tuyen"
      ),
      getItem(
        "Tin Tuyển Dụng",
        "11",
        <UserOutlined />,
        "/admin/thong_ke/tuyen_dung"
      ),
    ]),
  ];

  // Handle menu item click
  const onClick = (e) => {
    const { keyPath } = e;
    const selectedItem = items.find(
      (item) =>
        item.key === keyPath[0] ||
        item.children?.find((child) => child.key === keyPath[0])
    );

    if (selectedItem) {
      // If the selected item has a direct path, navigate to it
      if (selectedItem.path) {
        navigate(selectedItem.path);
      } else if (selectedItem.children) {
        // If a submenu item is clicked, find the correct child path
        const childItem = selectedItem.children.find(
          (child) => child.key === keyPath[0]
        );
        if (childItem && childItem.path) {
          navigate(childItem.path);
        }
      }
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-main-blue2"
    >
      {/* Logo Section */}
      <div
        className="flex justify-center items-center py-4"
        style={{
          height: collapsed ? "64px" : "120px", // Adjust the height based on collapse state
          transition: "all 0.3s",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: collapsed ? "40px" : "100px", // Adjust the width based on collapse state
            transition: "all 0.3s",
          }}
        />
      </div>

      {/* Menu Section */}
      <Menu
        className="bg-main-blue2 text-white"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items.map((item) => ({
          ...item,
          label: <span className="text-white">{item.label}</span>, // Đặt màu chữ cho mỗi mục
        }))}
        onClick={onClick}
        style={{
          border: "none",
        }}
      />
    </Sider>
  );
};

export default Sidebar;
