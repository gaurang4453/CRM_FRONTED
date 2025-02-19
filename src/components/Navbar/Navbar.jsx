import React from "react";
import { Link } from "react-router-dom";
import "/src/style/Navbar.css";
import PropMasterForm from "../Form/PropMasterForm";
import PropMasterTable from "../Index/PropMasterTable";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link className="navbar-brand" to="/">
            CRM Dashboard
          </Link>
        </div>

        <div className="navbar-right">
<<<<<<< HEAD
          <Link className="nav-link" to="/PropMasterForm" >Property Master</Link>
          <Link className="nav-link" to="/clients">Clients</Link>
          <Link className="nav-link" to="/reports">Reports</Link>
          <Link className="nav-link" to="/settings">Settings</Link>
=======
          <Link className="nav-link" to="/PropMasterTable">
            Property Master
          </Link>
          <Link className="nav-link" to="/clients">
            Clients
          </Link>
          <Link className="nav-link" to="/reports">
            Reports
          </Link>
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
>>>>>>> cde5b6ecaf13716591663fbc77f607ca9742e82c

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
