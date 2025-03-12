import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";

export default function UOMMasterForm() {
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
    if (id && id !== "undefined") {
      console.log("Received ID:", id);
      const fetchUOMMaster = async () => {
        try {
          const response = await AxiosInstance.get(`/UOMMaster/${id}`);
          const UOMMaster = response.data.data;
          console.log("Fetched UOMMaster:", UOMMaster);
          if (UOMMaster) {
            setValue("UOMID", UOMMaster.UOMID || UOMMaster.uomid);
            setValue("UOM", UOMMaster.UOM || UOMMaster.uom);
            setValue("CF", UOMMaster.CF || UOMMaster.cf);
            setValue("Status", UOMMaster.Status || UOMMaster.status);
            setValue("CUID", UOMMaster.cuid || UOMMaster.CUID);

            if (cuidOptions && cuidOptions.length > 0) {
              const selectedUser = cuidOptions.find(
                (user) => user.id == UOMMaster.CUID
              );
              if (selectedUser) {
                setValue("CUID", selectedUser.id);
              }
            }
          } else {
            console.warn("No data found for UOMID:", id);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Failed to fetch UOMMaster details.");
        } finally {
          setLoading(false);
        }
      };
      fetchUOMMaster();
    } else {
      setLoading(false);
    }
  }, [id, setValue, cuidOptions]);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    const payload = {
      UOMID: id || 0,
      UOM: data.UOM,
      CF: data.CF,
      Status: data.Status,
      CUID: parseInt(data.CUID, 10) || 0,
    };
    console.log("Payload being sent:", payload);

    try {
      await AxiosInstance.post("/UOMMaster", payload);
      alert(
        id ? "UOMMaster updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/UOMMasterTable");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this UOMMaster?")) {
      try {
        await AxiosInstance.delete(`/UOMMaster/${id}`);
        alert("UOMMaster deleted successfully!");
        navigate("/UOMMasterTable");
      } catch (error) {
        console.error("Error deleting UOMMaster:", error);
        alert("Failed to delete UOMMaster");
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
      <Form onSubmit={handleSubmit(onSubmit)} className=" allform">
        <h1 className="ribbon">{id ? "UOM Master Form" : "UOM Master Form"}</h1>
        <Container style={{ marginTop: "-160px" }}>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>UOM </Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your UOM."
                {...register("UOM", {
                  required: "UOM is required.",
                })}
                className="requiredinputfieldstyle"
              />
              {errors.UOM && (
                <p style={{ color: "red" }}>{errors.UOM.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CF</Form.Label>
            </Col>
            <Col md={5} className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Enter your CF."
                {...register("CF", {
                  required: "CF is required.",
                })}
                className="requiredinputfieldstyle"
              />
              {errors.CF && <p style={{ color: "red" }}>{errors.CF.message}</p>}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Status</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="Status"
                {...register("Status", { required: true })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {statusOptions?.length > 0 ? (
                  statusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.value || "Unnamed Status"}
                    </option>
                  ))
                ) : (
                  <option disabled>No status options available</option>
                )}
              </select>
              {errors.Status && (
                <p className="error-text">Please select a status.</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CUID</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="CUID"
                {...register("CUID", { required: true })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {cuidOptions?.length > 0 ? (
                  cuidOptions.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.value || "Unnamed User"}
                    </option>
                  ))
                ) : (
                  <option disabled>No User options available</option>
                )}
              </select>
              {errors.CUID && (
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
        onCancel={() => navigate("/UOMMasterTable")}
      />
    </>
  );
}
