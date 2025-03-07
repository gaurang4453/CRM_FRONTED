
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/components/style/Navbar.css";
import { TbLogout2 } from "react-icons/tb";
import { RiUserFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link className="navbar-brand" to="/home">
            CRM
          </Link>
          <div className="dropdown">
            <button className="dropdown-toggle">Account</button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/PropMasterTable">
                  Property Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/RoleMasterTable">
                  Role Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/UserMasterTable">
                  User Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/CompanyMasterTable">
                  Company Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/BranchMasterTable">
                  Branch Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/ItemMasterTable">
                  Item Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/UOMMasterTable">
                  UOM Master
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button className="dropdown-toggle">Marketing</button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/InquiryMasterTable">
                  Inquiry Master
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/InquiryFollowupMasterTable">
                  Inquiry Follow-up Master
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-right">
          {user && (
            <div className="dropdown">
              <RiUserFill style={{ fontSize: "1.36rem" }} />
              <button className="dropdown-toggle">{user.userName}</button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <TbLogout2 /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
