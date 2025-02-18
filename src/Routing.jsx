import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // Adjust the path if needed
import PropMasterForm from './components/Form/PropMasterForm'; // This is the form component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route path="/PropMasterForm" element={<PropMasterForm />} />
        {/* Add more routes for other components/pages if needed */}
      </Routes>
    </Router>
  );
};

export default App;
