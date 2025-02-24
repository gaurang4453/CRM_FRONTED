import React from "react";
import Navbar from "./Navbar/Navbar";
import Form from "./Account/PropMasterForm";
import PropmasterTable from "./Index/PropMasterTable";
import Footer from "./footer/Footer";
import PropMasterForm from "./Account/PropMasterForm";
import RoleMasterTable from "./Index/RolemasterTable";
const Home = () => {
  return (
    <>
      <h1>Home</h1>
     <RoleMasterTable/>
    </>
  );
};

export default Home;
