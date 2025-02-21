import { useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import "../style/style.css";
import React, { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance";
import Footer from "/src/components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";


export default function PropMasterForm() {
  const { id } = useParams(); // Get ID from URL (for editing)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(!!id); // Only load if editing
  const [error, setError] = useState(null);

  // Fetch property details if editing
  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const response = await AxiosInstance.get(`/PropMaster/${id}`);
          const property = response.data.data;

          setValue("propTypeName", property.propTypeName);
          setValue("propName", property.propName);
          setValue("propValue", property.propValue);
          setValue("status", property.status);
          setValue("CUID", property.cuid);
        } catch (err) {
          setError("Failed to fetch property details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    } else {
      // If it's a new form, ensure loading is false
      setLoading(false);
    }
  }, [id, setValue]);

  // Form submission (Create or Update)
  const onSubmit = async (data) => {
    const payload = {
      propID: id || 0, // Use 0 for new entry
      propTypeName: data.propTypeName,
      propName: data.propName,
      propValue: data.propValue,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      const response = id
        ? await AxiosInstance.post(`/PropMaster`, payload) // Update
        : await AxiosInstance.post("/PropMaster", payload); // Create

      alert(
        id ? "Property updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/PropMasterTable");
    } catch (error) {
      alert("Error submitting data");
    }
  };

  // Delete property
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await AxiosInstance.delete(`/PropMaster/${id}`);
        alert("Property deleted successfully!");
        navigate("/PropMasterTable");
      } catch (error) {
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1 className="ribbon">{id ? "Edit Property" : "Prop Master Form"}</h1>

      <Container>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Type Name:</label>
          </Col>
          <Col md={9}>
            <input
              {...register("propTypeName")}
              className="line-textbox"
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Name:</label>
          </Col>
          <Col md={9}>
            <input
              {...register("propName")}
              className="line-textbox"
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Value:</label>
          </Col>
          <Col md={9}>
            <input
              {...register("propValue")}
              className="line-textbox"
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Status:</label>
          </Col>
          <Col md={9}>
            <select {...register("status")} className="form-select" required>
              <option value="">--Select--</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>CUID:</label>
          </Col>
          <Col md={9}>
            <input
              {...register("CUID")}
              className="line-textbox"
              placeholder="Numbers only"
              required
            />
            {errors.CUID && (
              <p style={{ color: "red" }}>{errors.CUID.message}</p>
            )}
          </Col>
        </Row>
      </Container>

      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined} // Only show delete if editing
        onCancel={() => navigate("/PropMasterTable")}
      />
    </form>
  );
}

