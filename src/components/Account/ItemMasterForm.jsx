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
  console.log("statusOptions", statusOptions);
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");
  const { data: taxtypeOptions, error: taxtypeError } =
    useDropdownData("taxTypes");
  const { data: uomidOptions, error: uomidError } = useDropdownData("uoms");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await AxiosInstance.get(`/ItemMaster/${id}`);
          const item = response.data.data;
          console.log("item", item);

          if (item) {
            setValue("ItemID", item.ItemID || item.itemID);
            setValue("ItemNo", item.ItemNo || item.itemNo || "");
            setValue("ItemName", item.itemName || item.ItemName || "");
            setValue("Description", item.Description || item.description || "");
            setValue("TaxType", item.TaxType || item.taxType || "");
            setValue("HSNCOde", item.HSNCOde || item.hsncOde || "");
            setValue("UOMID", item.UOMID || item.uomid || "");
            setValue("Status", item.status || item.Status || "");
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
    console.log("Form data:", data);
    const payload = {
      ItemID: id || 0,
      ItemNo: data.ItemNo || 0,
      ItemName: data.ItemName,
      Description: data.Description,
      TaxType: parseInt(data.TaxType, 10) || 0,
      HSNCOde: data.HSNCOde,
      UOMID: data.UOMID || data.uomid,
      Status: data.Status || data.status,
      //  CUID: data.CUID,
      CUID: parseInt(data.CUID, 10) || parseInt(data.cuid, 10),
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
    return (
      <p className="error">Failed to fetch status options: {statusError}</p>
    );
  if (cuidError)
    return <p className="error">Failed to fetch User options: {cuidError}</p>;
  if (taxtypeError)
    return <p className="error">Failed to fetch tax options: {taxtypeError}</p>;
  if (uomidError)
    return <p className="error">Failed to fetch uom options: {uomidError}</p>;
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="allform">
        <h1 className="ribbon">{id ? "Item Master Form" : "Item Master Form"}</h1>
        <Container style={{ marginTop: "-160px" }}>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>ItemNo</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="ItemNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your ItemNo."
                  {...register("ItemNo", {
                    required: "ItemNo is required.",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.ItemNo && (
                  <p style={{ color: "red" }}>{errors.ItemNo.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>ItemName</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="ItemName">
                <Form.Control
                  type="text"
                  placeholder="Enter your ItemName."
                  {...register("ItemName", {
                    required: "ItemName is required.",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.ItemName && (
                  <p style={{ color: "red" }}>{errors.ItemName.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Description</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="Description">
                <Form.Control
                  type="text"
                  placeholder="Enter your Description."
                  {...register("Description", {
                    required: "Description is require.",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.Description && (
                  <p style={{ color: "red" }}>{errors.Description.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>TaxType</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="taxTypes"
                {...register("TaxType", { required: true })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {taxtypeOptions?.length > 0 ? (
                  taxtypeOptions.map((taxTypes, index) => (
                    <option key={taxTypes.id} value={taxTypes.value}>
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
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>HSNCOde</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="HSNCOde">
                <Form.Control
                  type="text"
                  placeholder="Enter your HSNCOde."
                  {...register("HSNCOde", {
                    required: "HSNCOde is required.",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.HSNCOde && (
                  <p style={{ color: "red" }}>{errors.HSNCOde.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>UOMID</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="uoms"
                {...register("UOMID", { required: true })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {uomidOptions?.length > 0 ? (
                  uomidOptions.map((uoms, index) => (
                    <option key={uoms.id} value={uoms.id}>
                      {uoms.value || "Unnamed unit"}
                    </option>
                  ))
                ) : (
                  <option disabled>No unit options available</option>
                )}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Status</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="status"
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
                      {status.value}
                    </option>
                  ))
                ) : (
                  <option disabled>No status options available</option>
                )}
              </select>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CUID</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="entryby"
                {...register("CUID", { required: true })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {cuidOptions?.length > 0 ? (
                  cuidOptions.map((entryby) => (
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
        onCancel={() => navigate(-1)}
      />
    </>
  );
}
