import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";

export default function UserMasterForm() {
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
  const { data: taxtypeOptions, error: taxtypeError } = useDropdownData("taxTypes");
  const { data: uomidOptions, error: uomidError } = useDropdownData("uoms");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await AxiosInstance.get(`/ItemMaster/${id}`);
          const item = response.data.data;
          console.log("item", item);

          if (item) {
            setValue("ItemID", item.ItemID || "");
            setValue("ItemNo", item.ItemNo || item.ItemNo || "");
            setValue("ItemName", item.ItemName || item.ItemName || "");
            setValue("Description", item.Description || item.Description || "");
            setValue("TaxType", item.TaxType || item.TaxType || "");
            setValue("HSNCOde", item.HSNCOde || item.HSNCOde || "");
            setValue("UOMID", item.UOMID || item.UOMID || "");
            setValue("Status", item.Status || item.status || "");
            setValue("CUID", item.CUID || item.cuid || "");
          } else {
            console.warn("No data found for ItemID:", id);
          }
        } catch (err) {
          setError("Failed to fetch Item details.");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ItemID: id || 0,
      ItemNo: data.ItemNo || 0,
      ItemName: data.ItemName,
      Description: data.Description,
      TaxType: data.TaxType,
      HSNCOde: data.HSNCOde,
      UOMID: data.UOMID,
      Status: data.Status,
      CUID: data.CUID,
      CUID: parseInt(data.CUID, 10) || 0,
    };

    try {
      const response = await AxiosInstance.post("/ItemMaster", payload);
      console.log("API Response:", response.data); // Log API response
      alert(id ? "User updated successfully!" : "Successfully submitted data");
      reset();
      navigate("/ItemMasterTable");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message); // Log error response
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Item?")) {
      try {
        await AxiosInstance.delete(`/ItemMaster/${id}`);
        alert("Item deleted successfully!");
        navigate("/ItemMasterTable");
      } catch (error) {
        alert("Failed to delete Item");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (statusError)
    return <p className="error">Failed to fetch status options: {statusError}</p>;
  if (cuidError)
    return <p className="error">Failed to fetch User options: {cuidError}</p>;
  if (taxtypeError)
    return <p className="error">Failed to fetch tax options: {taxtypeError}</p>;
  if (uomidError)
    return <p className="error">Failed to fetch uom options: {uomidError}</p>;
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        style={{
          height: "700px",
          overflow: "auto",
          padding: "20px",
          marginTop: "70px",
          marginBottom: "70px",
        }}
      >
        <h1 className="ribbon">Item Master Form</h1>
        <Container>
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>ItemNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="ItemNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your ItemNo"
                  {...register("ItemNo", {
                    required: "ItemNo is required",
                  })}
                  style={{
                    border: "none", 
                    borderBottom: "2px solid rgb(243, 185, 78)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "5px 0",
                    width: "80%",
                    borderRadius: "0", 
                  }}
                />
                {errors.ItemNo && (
                  <p style={{ color: "red" }}>{errors.ItemNo.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>ItemName:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="ItemName">
                <Form.Control
                  type="text"
                  placeholder="Enter your ItemName"
                  {...register("ItemName", {
                    required: "ItemName is required",
                  })}
                  style={{
                    border: "none", 
                    borderBottom: "2px solid rgb(243, 185, 78)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "5px 0",
                    width: "80%",
                    borderRadius: "0", 
                  }}
                />
                {errors.ItemName && (
                  <p style={{ color: "red" }}>{errors.ItemName.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Description:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="Description">
                <Form.Control
                  type="text"
                  placeholder="Enter your Description"
                  {...register("Description", {
                    required: "Description is required",
                  })}
                  style={{
                    border: "none", 
                    borderBottom: "2px solid rgb(243, 185, 78)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "5px 0",
                    width: "80%",
                    borderRadius: "0", 
                  }}
                />
                {errors.Description && (
                  <p style={{ color: "red" }}>{errors.Description.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>TaxType:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="taxTypes"
                {...register("taxTypes", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", 
                  padding: "0.2rem", 
                  fontSize: "14px",
                  width: "320px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {taxtypeOptions?.length > 0 ? (
                  taxtypeOptions.map((taxTypes, index) => (
                    <option key={taxTypes.id } value={taxTypes.id}>
                      {taxTypes.id || "Unnamed tax"}
                    </option>
                  ))
                ) : (
                  <option disabled>No TAX options available</option>
                )}
              </select>
              {errors.TaxType && (
                <p style={{ color: "red" }}>{errors.TaxType.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>HSNCOde:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="HSNCOde">
                <Form.Control
                  type="text"
                  placeholder="Enter your HSNCOde"
                  {...register("HSNCOde", {
                    required: "HSNCOde is required",
                  })}
                  style={{
                    border: "none", 
                    borderBottom: "2px solid rgb(243, 185, 78)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "5px 0",
                    width: "80%",
                    borderRadius: "0", 
                  }}
                />
                {errors.HSNCOde && (
                  <p style={{ color: "red" }}>{errors.HSNCOde.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>UOMID:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="uoms"
                {...register("uoms", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", 
                  padding: "0.2rem", 
                  fontSize: "14px",
                  width: "330px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {uomidOptions?.length > 0 ? (
                  uomidOptions.map((uoms, index) => (
                    <option key={uoms.value } value={uoms.value}>
                      {uoms.value || "Unnamed Status"}
                    </option>
                  ))
                ) : (
                  <option disabled>No status options available</option>
                )}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="status"
                {...register("Status", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", 
                  padding: "0.2rem", 
                  fontSize: "14px",
                  width: "330px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
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
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CUID:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="entryby"
                {...register("entryby", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  width: "80%", 
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", 
                  padding: "5px 0",
                  borderRadius: "0", 
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
            </Col>
          </Row>
        </Container>
      </Form>
      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/BranchMasterTable")}
      />
    </>
  );
}
