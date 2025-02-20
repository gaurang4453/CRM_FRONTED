import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PropMasterTable from "./components/PropMasterTable";
// import EditProperty from "./components/EditProperty";
// import PropMasterForm from "./components/Form/PropMasterForm";
import Home from "./components/Home";
import PropMasterTable from "./components/Index/PropMasterTable";
import EditPropertyMst from "./Edit/EditPropertyMst";
import PropMasterForm from "./components/Form/PropMasterForm";
import Navbar from "./components/Navbar/Navbar";

function Routing() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropMasterTable" element={<PropMasterTable />} />
          <Route path="/EditPropertyMst/:id" element={<EditPropertyMst />} />
          <Route path="/PropMasterForm" element={<PropMasterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
