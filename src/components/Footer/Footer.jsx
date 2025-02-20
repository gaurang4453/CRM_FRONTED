import React from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance"; // Ensure correct path

const Footer = () => {
  const navigate = useNavigate();

  // Function to handle Save button click
  const handleSave = async () => {
    try {
      console.log("Attempting to save property...");

      const response = await AxiosInstance.post("/save-property", {
        propertyData: { name: "New Property", value: 1000 },
      });

      console.log("Response received:", response);

      if (response?.status && response.status >= 200 && response.status < 300) {
        alert("Property saved successfully!");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Caught an error while saving:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
       
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Failed to save property. No response from server.");
      } else {
        console.error("Request setup error:", error.message);
        alert("Failed to save property. Request could not be made.");
      }
    }
  };

  // Function to handle Delete button click
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await AxiosInstance.delete(`/PropMaster/${id}`);
      alert("Property deleted successfully!");
      navigate("/PropMasterTable");
    } catch (error) {
      console.error(
        "Error deleting property:",
        error.response?.data || error.message
      );
      alert("Failed to delete property.");
    }
  };
  

  // Function to navigate back to the last page
  const handleList = () => {
    navigate(-1);
  };

  return (
    <footer className="position-fixed start-0 end-0 bottom-0 d-flex flex-row justify-content-end align-items-end" style={{ backgroundColor: '#0d254b' , height:"50px" }}>
        {/* <span className="text-white"></span> */}
        <div className="py-1 px-lg-5">
          <button className="btn btn-light mx-1" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-danger mx-1" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary mx-1" onClick={handleList}>
            List
          </button>
        </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;