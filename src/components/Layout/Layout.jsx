import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex">
      {/* Sidebar remains fixed */}
      <Sidebar />

      {/* Right side content changes based on route */}
      <Box component="main" className="main-content">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
