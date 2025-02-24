import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import PropMasterTable from "./components/Index/PropMasterTable";
import RoleMasterForm from "./components/Account/RoleMasterForm";
import PropMasterForm from "./components/Account/PropMasterForm";
import Navbar from "./components/Navbar/Navbar";

function Routing() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropMasterTable" element={<PropMasterTable />} />
          <Route path="/PropMasterForm/:id" element={<PropMasterForm />} />
          <Route path="/RoleMasterForm" element={<RoleMasterForm />} />
          <Route path="/PropMasterForm" element={<PropMasterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
