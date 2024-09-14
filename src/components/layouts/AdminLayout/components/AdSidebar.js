import React, { useState } from "react";
import styled from "styled-components";
import {
  FaHome,
  FaList,
  FaUsers,
  FaFlag,
  FaChartArea,
  FaTags,
} from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "250px" : "60px")};
  background: #bf2734;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  height: 100vh;
  padding-top: 20px;
  transition: width 0.3s ease-in-out;
`;

const SidebarButton = styled.button`
  position: absolute;
  top: 20px;
  right: -18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 4px ${({ theme }) => theme.shadow},
    0 0 7px ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
  border: none;
`;

const LinkContainer = styled.div`
  margin: 8px 0;
  padding: 0 15%;

  :hover {
    background: ${({ theme }) => theme.bgHover};
  }

  .Links {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 10px;
    height: 40px
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.divider};
  margin: 20px 0;
`;

const SubmenuContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding-left: 20px;
  transition: all 0.3s;
`;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { userRoles } = useUserInfo();
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const toggleStats = () => {
    setIsStatsVisible(!isStatsVisible);
  };

  return (
    <SidebarContainer isOpen={sidebarOpen} className="text-white">
      <SidebarButton
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-black"
      >
        <BiMenuAltRight />
      </SidebarButton>
      <LinkContainer>
        <Link to="/admin" className="Links">
          <FaHome className="Linkicon" />
          {sidebarOpen && <span>Dashboard</span>}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to="/admin/the_loai" className="Links">
          <FaList className="Linkicon" />
          {sidebarOpen && <span>Category</span>}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to="/admin/tag" className="Links">
          <FaTags className="Linkicon" />
          {sidebarOpen && <span>Tag</span>}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to="/admin/quan_ly_nguoi_dung" className="Links">
          <FaUsers className="Linkicon" />
          {sidebarOpen && <span>Users</span>}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to="/admin/banners" className="Links">
          <FaFlag className="Linkicon" />
          {sidebarOpen && <span>Banners</span>}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <div
          className="Links flex items-center justify-between"
          onClick={toggleStats}
        >
          <div className="flex items-center">
            <FaChartArea className="Linkicon" />
            {sidebarOpen && <span className="ml-2">Thống Kê</span>}
          </div>
          <IoIosArrowDown
            className={`ml-2 transition-transform ${
              isStatsVisible ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isStatsVisible && (
          <SubmenuContainer isOpen={sidebarOpen} className=" text-14">
            <Link to="/admin/thong_ke/blog" className="Links block mt-2">
              <span>Bài Viết</span>
            </Link>
            <Link to="/admin/thong_ke/san_pham" className="Links block mt-2">
              <span>Danh mục sản phẩm</span>
            </Link>
            <Link
              to="/admin/thong_ke/the_loai"
              className="Links block mt-2 text-14"
            >
              <span>Thống kê sản phẩm theo danh mục</span>
            </Link>
            <Link
              to="/admin/thong_ke/don_ung_tuyen"
              className="Links block mt-2"
            >
              <span>Thống kê các đơn ứng tuyển</span>
            </Link>
            <Link to="/admin/thong_ke/ung_tuyen" className="Links block mt-2">
              <span>Thống kê ứng tuyển</span>
            </Link>
            <Link to="/admin/thong_ke/tuyen_dung" className="Links block mt-2">
              <span>Thống kê tuyển dụng</span>
            </Link>
          </SubmenuContainer>
        )}
      </LinkContainer>

      {userRoles.includes("admin") && (
        <LinkContainer>
          <Link to="/admin/thong_tin_web" className="Links">
            <GrUserAdmin className="Linkicon" />
            {sidebarOpen && <span>Thông Tin Web</span>}
          </Link>
        </LinkContainer>
      )}
      <Divider />
    </SidebarContainer>
  );
};

export default Sidebar;
