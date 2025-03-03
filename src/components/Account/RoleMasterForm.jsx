import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";

export default function RoleMasterForm() {
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
      const fetchRole = async () => {
        try {
          const response = await AxiosInstance.get(`/RoleMaster/${id}`);
          const role = response.data.data;

          if (role) {
            setValue("roleName", role.roleName || "");
            setValue("status", role.status || "");
            setValue("CUID", role.cuid || "");
          } else {
            console.warn("No data found for roleID:", id);
          }
        } catch (err) {
          setError("Failed to fetch role details.");
        } finally {
          setLoading(false);
        }
      };
      fetchRole();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      roleID: id || 0,
      roleName: data.roleName,
      status: data.status,
      CUID: parseInt(data.CUID, 10) || 0,
    };

    try {
      await AxiosInstance.post("/RoleMaster", payload);
      alert(id ? "Role updated successfully!" : "Successfully submitted data");
      reset();
      navigate("/RoleMasterTable");
    } catch (error) {
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Role?")) {
      try {
        await AxiosInstance.delete(`/RoleMaster/${id}`);
        alert("Role deleted successfully!");
        navigate("/RoleMasterTable");
      } catch (error) {
        alert("Failed to delete Role.");
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
      <Form onSubmit={handleSubmit(onSubmit)}>
       <h1 className="ribbon" >
        {id ? "Edit Property" : "Role Master Form"}
        </h1>
        <Container>
          {/* Role Name */}
          <Row style={{ marginBottom: "15px" }}>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Role Name:</Form.Label>
            </Col>
            <Col md={10}>
              <Form.Group controlId="roleName">
                <Form.Control
                  type="text"
                  placeholder="Enter your role name."
                  {...register("roleName", {
                    required: "Role name is required.",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0",
                    // Decreases the width of the input box
                  }}
                />
                {errors.roleName && (
                  <p style={{ color: "black" }}>{errors.roleName.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Status */}
          <Row style={{ marginBottom: "15px" }}>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={10}>
              <select
                id="status"
                {...register("status", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  fontSize: "14px",
                  border: "2px solid rgb(243, 185, 78)",
                  width: "785px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {statusOptions?.length > 0 ? (
                  statusOptions.map((status, index) => (
                    <option key={status.value || index} value={status.id}>
                      {status.value || "Unnamed Status"}
                    </option>
                  ))
                ) : (
                  <option disabled>No status options available</option>
                )}
              </select>
              {errors.status && (
                <p className="error-text">Please select a status.</p>
              )}
            </Col>
          </Row>

          {/* CUID */}
          <Row style={{ marginBottom: "15px" }}>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CUID:</Form.Label>
            </Col>
            <Col md={10}>
              <select
                id="CUID"
                {...register("CUID", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "785px",
                }}
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
      </Form>
      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/RoleMasterTable")}
      />
    </>
  );
}
