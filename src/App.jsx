import { useState } from "react";
import PropMasterTable from "./components/Index/PropMasterTable";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import EditPropertyMst from "./Edit/EditPropertyMst";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropMasterForm from "./components/Form/PropMasterForm";
import Routing from "./Routing";
function App() {
  return (
    <>
<<<<<<< HEAD
      <Router>
        <Navbar /> {/* Navbar should be within Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropMasterTable" element={<PropMasterTable />} />
          <Route path="/EditPropertyMst/:id" element={<EditPropertyMst />} />
          
       </Routes>    
      </Router>
=======
      <Routing />
>>>>>>> 5070d114b4b7b69fb518b0f5fa5c04bef8980f86
    </>
  );
}

export default App;
