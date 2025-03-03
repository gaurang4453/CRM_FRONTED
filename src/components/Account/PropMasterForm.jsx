import { useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import "../style/style.css";
import React, { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance";
import Footer from "/src/components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import useDropdownData from "../UseDropdownData";

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

  const { data: statusOptions, error: statusError } = useDropdownData("status");
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const response = await AxiosInstance.get(`/PropMaster/${id}`);
          const property = response.data.data;

          setValue("propTypeName", property.propTypeName || "");
          setValue("propName", property.propName || "");
          setValue("propValue", property.propValue || "");
          setValue("status", property.status || "");
          setValue("CUID", property.cuid || "");
        } catch (err) {
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
      alert(
        id ? "Property updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/PropMasterTable");
    } catch (error) {
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
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (statusError)
    return (
      <p className="error">Failed to fetch status options: {statusError}</p>
    );
  if (cuidError)
    return <p className="error">Failed to fetch User options: {cuidError}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="ribbon">
          {id ? "Edit Property" : "Prop Master Form"}
        </h1>
        <Container>
          <Row className="mb-3">
            <Col md={3} className="d-flex align-items-center">
              <label htmlFor="propTypeName">Property Type Name:</label>
            </Col>
            <Col md={8}>
              <input
                id="propTypeName"
                placeholder="Enter Property Type Name."
                {...register("propTypeName", { required: true })}
                className="line-textbox"
              />
              {errors.propTypeName && (
                <p className="error-text">This field is required.</p>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="d-flex align-items-center">
              <label htmlFor="propName">Property Name:</label>
            </Col>
            <Col md={8}>
              <input
                id="propName"
                placeholder="Enter Property Name."
                {...register("propName", { required: true })}
                className="line-textbox"
              />
              {errors.propName && (
                <p className="error-text">This field is required.</p>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="d-flex align-items-center">
              <label htmlFor="propValue">Property Value:</label>
            </Col>
            <Col md={8}>
              <input
                id="propValue"
                placeholder="Enter Property Value."
                {...register("propValue", { required: true })}
                className="line-textbox"
              />
              {errors.propValue && (
                <p className="error-text">This field is required.</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={3} className="d-flex align-items-center">
              <label htmlFor="status">Status:</label>
            </Col>
            <Col md={6}>
              <select
                id="status"
                {...register("status", { required: "Please select a status" })}
                className="form-select"
                defaultValue=""
                style={{
                  width: "75%", // Full width to match the form layout
                  border: "1px solid rgb(243, 185, 78)", // Custom border for dropdown
                  borderRadius: "4px", // Slightly rounded corners for better appearance
                  padding: "5px", // Padding for better spacing inside the dropdown
                  backgroundColor: "#fff", // White background
                  fontSize: "14px", // Font size for the options
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {statusOptions?.length > 0 ? (
                  statusOptions.map((status, index) => (
                    <option key={status.value || index} value={status.value}>
                      {status.value}
                    </option>
                  ))
                ) : (
                  <option disabled>No status options available</option>
                )}
              </select>
              {errors.status && (
                <p className="error-text" style={{ color: "red" }}>
                  Please select a status.
                </p>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="d-flex align-items-center">
              <label htmlFor="CUID">CUID:</label>
            </Col>
            <Col md={6}>
              <select
                id="entryby"
                {...register("entryby", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  width: "75%", // Full width to match the form layout
                  border: "1px solid rgb(243, 185, 78)", // Custom border for dropdown
                  borderRadius: "4px", // Slightly rounded corners for better appearance
                  padding: "5px", // Padding for better spacing inside the dropdown
                  backgroundColor: "#fff", // White background
                  fontSize: "14px", // Add padding to match input boxes
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {cuidOptions?.length > 0 ? (
                  cuidOptions.map((entryby, index) => (
                    <option key={entryby.value} value={entryby.value}>
                      {entryby.value || "Unnamed User"}
                    </option>
                  ))
                ) : (
                  <option disabled>No User options available</option>
                )}
              </select>
              {errors.status && (
                <p className="error-text">Please select a User.</p>
              )}
            </Col>
          </Row>
        </Container>
      </form>
      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/PropMasterTable")}
      />
    </>
  );
}
