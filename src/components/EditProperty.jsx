import React, { useState, useEffect } from "react";

const PropMasterForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    propName: "",
    propValue: "",
    status: "",
    CUID: "",
  });

  // Populate form when initialData is received
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call onSave function from parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Property Name:</label>
      <input
        type="text"
        name="propName"
        value={formData.propName}
        onChange={handleChange}
        required
      />

      <label>Property Value:</label>
      <input
        type="number"
        name="propValue"
        value={formData.propValue}
        onChange={handleChange}
        required
      />

      <label>Status:</label>
      <input
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      />

      <label>CUID:</label>
      <input
        type="text"
        name="CUID"
        value={formData.CUID}
        onChange={handleChange}
        required
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default PropMasterForm;
