import React from "react";

const Footer = ({ onSave, onCancel, onDelete }) => {
  // Function to handle Save button click

  return (
    <footer className="position-fixed start-0 end-0 bottom-0 d-flex flex-row justify-content-end align-items-end" style={{ backgroundColor: '#0d254b' , height:"50px" }}>
        {/* <span className="text-white"></span> */}
        <div className="py-1 px-lg-5">
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
      {/* </div> */}
    </footer>
  );
};

export default Footer;