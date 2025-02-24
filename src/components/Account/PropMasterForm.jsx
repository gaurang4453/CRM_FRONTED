import { useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import "../style/style.css";
import React, { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance";
import Footer from "/src/components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import useDropdownData from "../UseDropdownData"; // Import the custom hook

export default function PropMasterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch status dropdown data
  const { data: statusOptions, error: statusError } = useDropdownData("status");

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const response = await AxiosInstance.get(`/PropMaster/${id}`);
          const property = response.data.data;
          console.log("Fetched Property Data:", property);

          setValue("propTypeName", property.propTypeName || "");
          setValue("propName", property.propName || "");
          setValue("propValue", property.propValue || "");
          setValue("status", property.status || "");
          setValue("CUID", property.cuid || "");
        } catch (err) {
          console.error("Error fetching property:", err);
          setError("Failed to fetch property details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      propID: id || 0, 
      propTypeName: data.propTypeName,
      propName: data.propName,
      propValue: data.propValue,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      await AxiosInstance.post("/PropMaster", payload);
      alert(id ? "Property updated successfully!" : "Successfully submitted data");
      reset();
      navigate("/PropMasterTable");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await AxiosInstance.delete(`/PropMaster/${id}`);
        alert("Property deleted successfully!");
        navigate("/PropMasterTable");
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (statusError) return <p className="error">Failed to fetch status options: {statusError}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1 className="ribbon">{id ? "Edit Property" : "Prop Master Form"}</h1>

      <Container>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Type Name:</label>
          </Col>
          <Col md={9}>
            <input {...register("propTypeName", { required: true })} className="line-textbox" />
            {errors.propTypeName && <p className="error-text">This field is required.</p>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Name:</label>
          </Col>
          <Col md={9}>
            <input {...register("propName", { required: true })} className="line-textbox" />
            {errors.propName && <p className="error-text">This field is required.</p>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Value:</label>
          </Col>
          <Col md={9}>
            <input {...register("propValue", { required: true })} className="line-textbox" />
            {errors.propValue && <p className="error-text">This field is required.</p>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Status:</label>
          </Col>
          <Col md={9}>
            <select {...register("status", { required: true })} className="form-select">
              <option value="">--Select--</option>
              {statusOptions?.length > 0 ? (
                statusOptions.map((status) => (
                  <option key={status.id || status.PropValue} value={status.PropValue}>
                    {status.PropName}
                  </option>
                ))
              ) : (
                <option disabled>No status options available</option>
              )}
            </select>
            {errors.status && <p className="error-text">Please select a status.</p>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>CUID:</label>
          </Col>
          <Col md={9}>
            <input
              {...register("CUID", { required: true, pattern: /^[0-9]+$/ })}
              className="line-textbox"
              placeholder="Enter in numbers only."
            />
            {errors.CUID && <p className="error-text">CUID must be a valid number.</p>}
          </Col>
        </Row>
      </Container>

      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/PropMasterTable")}
      />
    </form>
  );
}
