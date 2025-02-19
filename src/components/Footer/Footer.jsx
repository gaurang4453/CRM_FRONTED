import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-3 fixed-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-muted">© 2025 Your Company</span>
        <div>
          <button className="btn btn-primary mx-1">Save</button>
          <button className="btn btn-danger mx-1">Delete</button>
          <button className="btn btn-secondary mx-1">List</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
