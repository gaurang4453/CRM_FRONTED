import React from "react";
import { Link } from "react-router-dom";
import "/src/components/style/Navbar.css";
import PropMasterTable from "../Index/PropMasterTable";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left h1">
          <Link className="navbar-brand" to="/">
            CRM Dashboard
          </Link>
        </div>

        <div className="navbar-right">
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
                <Link className="dropdown-item" to="/BranchMasterForm">
                  Branch Master
                </Link>
              </li>
            </ul>
          </div>
          <Link className="nav-link" to="/clients">
            Clients
          </Link>
          <Link className="nav-link" to="/reports">
            Reports
          </Link>
          <Link className="nav-link" to="/settings">
            Settings
          </Link>

          <div className="dropdown">
            <button className="dropdown-toggle">Profile</button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/account">
                  My Account
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/orders">
                  Orders
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
