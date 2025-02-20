import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import { Row, Col, Button, Container } from "react-bootstrap"; // Importing Bootstrap components
import "/src/style/style.css";

import Footer from "../components/footer/Footer";
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
    <form onSubmit={handleSubmit(handleFormSubmit)}  className="form">
      <h1 className="ribbon">Edit Property</h1>

      <Container className="container">
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Type Name :</label>
          </Col>
          <Col md={9}>
            <input {...register("propTypeName")} className="line-textbox" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Name :</label>
          </Col>
          <Col md={9}>
            <input {...register("propName")} className="line-textbox" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Value :</label>
          </Col>
          <Col md={9}>
            <input {...register("propValue")} className="line-textbox" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center" >
            <label className="select.form-select">Status :</label>
          </Col>
          <Col md={9}>
            <select {...register("status")} className="form-select">
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>CUID :</label>
          </Col>
          <Col md={9}>
            <input
              {...register("CUID")}
              className="line-textbox"
              placeholder="Numbers only"
            />
          </Col>
        </Row>

      <Footer
        onSave={handleSubmit(handleFormSubmit)}
        onDelete={handleDelete}
        onCancel={() => navigate("/PropMasterTable")}
      />
    </form>
  );
}

export default EditPropertyMst;
