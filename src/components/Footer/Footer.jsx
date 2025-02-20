import React from "react";
import AxiosInstance from "../../AxiosInstance"; // Ensure correct path

const Footer = () => {
  // Function to handle Save button click
  const handleSave = async () => {
    try {
      const response = await fetch("/save-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyData: { name: "New Property", value: 1000 } }),
      });
  
      const data = await response.json();
      console.log("Fetch response:", data);
  
      if (response.ok) {
        alert("Property saved successfully!");
      } else {
        console.error("Fetch error:", data);
        alert("Failed to save property.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to save property.");
    }
  };
 

  // Function to handle Delete button click
  const handleDelete = async () => {
    try {
      const response = await AxiosInstance.delete("/delete-property", { 
        data: { propertyId: 1 } // Replace with actual ID
      });
      console.log("Delete Successful:", response.data);
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  return (
    <footer className="bg-primary py-3 fixed-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-white"></span>
        <div>
          <button className="btn btn-light mx-1" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-danger mx-1" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary mx-1">List</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
