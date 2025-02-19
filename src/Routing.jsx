import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropMasterTable from "./components/PropMasterTable";
import CreateProperty from "./components/CreateProperty";
import EditProperty from "./components/EditProperty"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/propmaster-table" element={<PropMasterTable />} />
        <Route path="/PropMasterForm" element={<PropMasterForm />} />
        <Route path="/EditProperty/:propID" element={<EditProperty />} />
        <Route path="/" element={<PropMasterTable />} /> {/* Default Route */}
      </Routes>
    </Router>
  );
}

export default App;
