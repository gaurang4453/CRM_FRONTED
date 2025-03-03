import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home";
import PropMasterTable from "./components/Index/PropMasterTable";
import RoleMasterForm from "./components/Account/RoleMasterForm";
import PropMasterForm from "./components/Account/PropMasterForm";
import RoleMasterTable from "./components/Index/RolemasterTable";
import UserMasterForm from "./components/Account/UserMasterForm";
import UserMasterTable from "./components/Index/UserMasterTable";
import CompanyMasterForm from "./components/Account/CompanyMasterForm";
import CompanyMasterTable from "./components/Index/CompanyMasterTable";
import BranchMasterForm from "./components/Account/BranchMasterForm";
import BranchMasterTable from "./components/Index/BranchMasterTable";
import ItemMasterForm from "./components/Account/ItemMasterForm";
import ItemMasterTable from "./components/Index/ItemMasterTable";
import UOMMasterTable from "./components/Index/UOMMasterTable";
import UOMMasterForm from "./components/Account/UOMMasterForm";

import Login from "./components/Account/Login";
import Navbar from "./components/Navbar/Navbar";

export default function Routing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Navbar />
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/PropMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <PropMasterTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/RoleMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <RoleMasterTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/UserMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <UserMasterTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/CompanyMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <CompanyMasterTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/BranchMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <BranchMasterTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/ItemMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <ItemMasterTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/UOMMasterTable"
            element={
              <PrivateRoute>
                <Navbar />
                <UOMMasterTable />
              </PrivateRoute>
            }
          />

          <Route
            path="/PropMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <PropMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/RoleMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <RoleMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/UserMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <UserMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/CompanyMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <CompanyMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/BranchMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <BranchMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ItemMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <ItemMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/UOMMasterForm/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <UOMMasterForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/RoleMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <RoleMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/PropMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <PropMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/UserMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <UserMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/CompanyMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <CompanyMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/BranchMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <BranchMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ItemMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <ItemMasterForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/UOMMasterForm"
            element={
              <PrivateRoute>
                <Navbar />
                <UOMMasterForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
