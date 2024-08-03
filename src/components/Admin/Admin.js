import SideBar from "./SideBar";
import "./Admin.scss";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Admin = (props) => {
  const [collapsed, setCollaped] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars
          onClick={() => {
            setCollaped(!collapsed);
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
