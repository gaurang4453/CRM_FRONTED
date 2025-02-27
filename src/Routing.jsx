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
import ItemMasterForm from "./components/Account/ItemMasterForm";
import ItemMasterTable from "./components/Index/ItemMasterTable";
import UOMMasterTable from "./components/Index/UOMMasterTable";
import UOMMasterForm from "./components/Account/UOMMstForm";

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
          <Route path="/ItemMasterTable" element={<ItemMasterTable />} />
          <Route path="/UOMMasterTable" element={<UOMMasterTable />} />

          <Route path="/PropMasterForm/:id" element={<PropMasterForm />} />
          <Route path="/RoleMasterForm/:id" element={<RoleMasterForm />} />
          <Route path="/UserMasterForm/:id" element={<UserMasterForm />} />
          <Route
            path="/CompanyMasterForm/:id"
            element={<CompanyMasterForm />}
          />
          <Route path="/BranchMasterForm/:id" element={<BranchMasterForm />} />
          <Route path="/ItemMasterForm/:id" element={<ItemMasterForm />} />
          <Route path="/UOMMasterForm/:id" element={<UOMMasterForm />} />

          <Route path="/RoleMasterForm" element={<RoleMasterForm />} />
          <Route path="/PropMasterForm" element={<PropMasterForm />} />
          <Route path="/UserMasterForm" element={<UserMasterForm />} />
          <Route path="/CompanyMasterForm" element={<CompanyMasterForm />} />
          <Route path="/BranchMasterForm" element={<BranchMasterForm />} />
          <Route path="/ItemMasterForm" element={<ItemMasterForm />} />
          <Route path="/UOMMasterForm" element={<UOMMasterForm />} />
        </Routes>
      </Router>
    </>
  );
}
