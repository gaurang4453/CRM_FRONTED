import React from "react";

const Footer = ({ onSave, onCancel, onDelete, showDeleteButton }) => {
  // Function to handle Save button click

  return (
    <footer className="bg-primary py-3 fixed-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-white"></span>
        <div>
          <button className="btn btn-light mx-1" onClick={onSave}>
            Save
          </button>

          <button className="btn btn-danger mx-1" onClick={onDelete}>
            Delete
          </button>

          <button className="btn btn-secondary mx-1 " onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
