import { useState } from "react";
import PropMasterTable from "./components/Index/PropMasterTable";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar /> {/* Navbar should be within Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropMasterTable" element={<PropMasterTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
