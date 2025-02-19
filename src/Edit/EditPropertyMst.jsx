import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

function EditPropertyMst() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property details when component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("Fetching data for ID:", id);
        const response = await AxiosInstance.get(`/PropMaster/${id}`);
        console.log("Fetched Data:", response.data);

        if (!response.data) {
          setError("No data found for this property.");
          return;
        }

        const property = response.data.data;
        setValue("propTypeName", property.propTypeName);
        setValue("propName", property.propName);
        setValue("propValue", property.propValue);
        setValue("status", property.status);
        setValue("CUID", property.cuid);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, setValue]);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    const payload = {
      propID: id,
      propTypeName: data.propTypeName,
      propName: data.propName,
      propValue: data.propValue,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      const response = await AxiosInstance.post(`/PropMaster`, payload);
      console.log("Update Response:", response);
      alert("Property updated successfully!");
      navigate("/PropMasterTable");
    } catch (error) {
      console.error(
        "Error updating property:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update property.");
    }
  };

  ////delete code

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
      <h1>Edit Property</h1>

      <div className="form-field">
        <label>Property Type Name :</label>
        <input {...register("propTypeName")} />
      </div>

      <div className="form-field">
        <label>Property Name :</label>
        <input {...register("propName")} />
      </div>

      <div className="form-field">
        <label>Property Value :</label>
        <input {...register("propValue")} />
      </div>

      <div className="form-field">
        <label>Status :</label>
        <select {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="form-field">
        <label>CUID :</label>
        <input {...register("CUID")} placeholder="Numbers only" />
      </div>

      <div className="submit-container">
        <input type="submit" value="Update" />
        <button
          className="delete-button mx-1 btn btn-warning"
          type="button"
          onClick={handleDelete}
        >
          🗑️ Delete
        </button>
        <button
          className="cancel-button mx-1 btn btn-danger size "
          type="button"
          onClick={() => navigate("/PropMasterTable")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditPropertyMst;
