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
      CUID: data.CUID,
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
  if (statusError) return <p className="error">Failed to fetch status options: {statusError}</p>;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Role Master Form</h1>
        <Container>
          <Row>
            <Col md={2}><Form.Label>Role Name:</Form.Label></Col>
            <Col md={10}>
              <Form.Group controlId="formRoleName">
                <Form.Control
                  type="text"
                  placeholder="Enter your role name"
                  {...register("roleName", { required: "Role name is required" })}
                />
                {errors.roleName && <p style={{ color: "red" }}>{errors.roleName.message}</p>}
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2}><Form.Label>Status:</Form.Label></Col>
            <Col md={9}>
              <select id="status" {...register("status", { required: true })} className="form-select">
                <option value="">--Select--</option>
                {statusOptions?.length > 0 ? (
                  statusOptions.map((status, index) => (
                    <option key={status.value || index} value={status.value}>
                      {status.value || "Unnamed Status"}
                    </option>
                  ))
                ) : (
                  <option disabled>No status options available</option>
                )}
              </select>
              {errors.status && <p className="error-text">Please select a status.</p>}
            </Col>
          </Row>
          <Row>
            <Col md={2}><Form.Label>CUID:</Form.Label></Col>
            <Col md={10}>
              <Form.Group controlId="CUID">
                <Form.Control
                  type="number"
                  placeholder="Enter your CUID"
                  {...register("CUID", { required: "CUID is required" })}
                />
                {errors.CUID && <p style={{ color: "red" }}>{errors.CUID.message}</p>}
              </Form.Group>
            
        </Container>
      </Form>
      <Footer className="footer" onSave={handleSubmit(onSubmit)} onDelete={id ? handleDelete : undefined} onCancel={() => navigate("/RoleMasterTable")} />
    </>
  );
}