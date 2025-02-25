import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import PropMasterTable from "./components/Index/PropMasterTable";
import RoleMasterForm from "./components/Account/RoleMasterForm";
import PropMasterForm from "./components/Account/PropMasterForm";
import RoleMasterTable from "./components/Index/RolemasterTable";
import UserMasterForm from "./components/Account/UserMasterForm";
import UserMasterTable from "./components/Index/UserMasterTable";
import Navbar from "./components/Navbar/Navbar";

function Routing() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropMasterTable" element={<PropMasterTable />} />
          <Route path="/RoleMasterTable" element={<RoleMasterTable />} />
          <Route path="/UserMasterTable" element={<UserMasterTable />} />

          <Route path="/PropMasterForm/:id" element={<PropMasterForm />} />
          <Route path="/RoleMasterForm/:id" element={<RoleMasterForm />} />
          <Route path="/UserMasterForm/:id" element={<UserMasterForm />} />

          <Route path="/RoleMasterForm" element={<RoleMasterForm />} />
          <Route path="/PropMasterForm" element={<PropMasterForm />} />
          <Route path="/UserMasterForm" element={<UserMasterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
