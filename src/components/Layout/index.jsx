import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <Outlet />
      </div>
      <Sidebar />
    </>
  );
};

export default Layout;
