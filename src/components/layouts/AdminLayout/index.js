import React, { useState } from "react";
import Navbar from "../DefaultLayout/components/nav";
import styled from "styled-components";
import Sidebar from "./components/AdSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Navbar />
      <Container className={sidebarOpen ? "sidebarState active" : ""}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {children}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
`;

export default AdminLayout;
