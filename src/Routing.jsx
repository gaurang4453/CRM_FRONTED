import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
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

import Navbar from "./components/Navbar/Navbar";

export default function Routing() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropMasterTable" element={<PropMasterTable />} />
          <Route path="/RoleMasterTable" element={<RoleMasterTable />} />
          <Route path="/UserMasterTable" element={<UserMasterTable />} />
          <Route path="/CompanyMasterTable" element={<CompanyMasterTable />} />
          <Route path="/BranchMasterTable" element={<BranchMasterTable />} />
          
          <Route path="/PropMasterForm/:id" element={<PropMasterForm />} />
          <Route path="/RoleMasterForm/:id" element={<RoleMasterForm />} />
          <Route path="/UserMasterForm/:id" element={<UserMasterForm />} />
          <Route path="/CompanyMasterForm/:id" element={<CompanyMasterForm />} />
          <Route path="/BranchMasterForm/:id" element={<BranchMasterForm />} />


          <Route path="/RoleMasterForm" element={<RoleMasterForm />} />
          <Route path="/PropMasterForm" element={<PropMasterForm />} />
          <Route path="/UserMasterForm" element={<UserMasterForm />} />
          <Route path="/CompanyMasterForm" element={<CompanyMasterForm />} />
          <Route path="/BranchMasterForm" element={<BranchMasterForm />} />
        </Routes>
      </Router>
    </>
  );
}
