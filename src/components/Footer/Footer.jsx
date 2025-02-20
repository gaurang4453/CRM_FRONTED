import React from "react";

const Footer = ({ onSave, onCancel, onDelete, showDeleteButton }) => {
  // Function to handle Save button click

  return (
    <footer
      className="py-1 fixed-bottom"
      style={{ backgroundColor: "#0d254b", height: "120px" }}
    >
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
