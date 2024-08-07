import SideBar from "./SideBar";
import "./Admin.scss";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
  const [collapsed, setCollaped] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header"></div>
        <FaBars
          onClick={() => {
            setCollaped(!collapsed);
          }}
        />
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
