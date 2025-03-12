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
          setValue("entryby", property.cuid || property.CUID);
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
      entryby: data.CUID,
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
      <form onSubmit={handleSubmit(onSubmit)} className="allform">
        <h1 className="ribbon">{id ? "Prop Master Form" : "Prop Master Form"}</h1>
        <Container style={{ marginTop: "-140px" }}>
          <Row className="mb-3 ">
            <Col md={2} className="d-flex align-items-center">
              <label htmlFor="propTypeName">Property Type Name</label>
            </Col>
            <Col md={4}>
              <input
                id="propTypeName"
                placeholder="Enter Property Type Name."
                {...register("propTypeName", { required: true })}
                className="requiredinputfieldstyle"
              />
              {errors.propTypeName && (
                <p className="error-text">This field is required.</p>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2} className="d-flex align-items-center">
              <label htmlFor="propName">Property Name</label>
            </Col>
            <Col md={4}>
              <input
                id="propName"
                placeholder="Enter Property Name."
                {...register("propName", { required: true })}
                className="requiredinputfieldstyle"
              />
              {errors.propName && (
                <p className="error-text">This field is required.</p>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2} className="d-flex align-items-center">
              <label htmlFor="propValue">Property Value</label>
            </Col>
            <Col md={4}>
              <input
                id="propValue"
                placeholder="Enter Property Value."
                {...register("propValue", { required: true })}
                className="requiredinputfieldstyle"
              />
              {errors.propValue && (
                <p className="error-text">This field is required.</p>
              )}
            </Col>
          </Row>
          
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <label htmlFor="status">Status</label>
            </Col>
            <Col md={4}>
              <select
                id="status"
                {...register("status", { required: "Please select a status" })}
                className="requireddropdownform"
                defaultValue=""
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
          <br />
          <Row className="mb-3">
            <Col md={2} className="d-flex align-items-center">
              <label htmlFor="CUID">CUID</label>
            </Col>
            <Col md={4}>
              <select
                id="entryby"
                {...register("entryby", { required: true })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {cuidOptions?.length > 0 ? (
                  cuidOptions.map((entryby, index) => (
                    <option key={entryby.id} value={entryby.id}>
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
