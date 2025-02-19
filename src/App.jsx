import { useState } from 'react';
import PropMasterForm from './components/Form/PropMasterForm';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import PropMasterTable from "./components/Index/PropMasterTable";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";

import React from 'react';

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaOptinMonster } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
     <Router>
      <Navbar /> {/* Navbar should be within Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PropMasterForm" element={<PropMasterForm />} />
        <Route path="/Footer" element={<FaOptinMonster />} />
      </Routes>
    </Router>
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
