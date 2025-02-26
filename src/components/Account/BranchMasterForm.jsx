import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";

export default function BranchMasterForm() {
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
  const { data: companyOptions, error: companyError } =useDropdownData("companies");
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");

  useEffect(() => {
    if (id && id !== "undefined") {
      console.log("Received ID:", id);
      const fetchBranch = async () => {
        try {
          const response = await AxiosInstance.get(`/BranchMaster/${id}`);
          const branch = response.data.data;
          console.log("Fetched Branch:", branch);
          
          if (branch) {
            setValue("BranchID", branch.branchID || branch.BranchID || "");
            setValue("BranchName", branch.branchName || "");
            setValue("CurrencyCode", branch.currencyCode || "");
            setValue("ShortName", branch.shortName || "");
            setValue("CompanyID", branch.companyID || "");
            setValue("Remarks", branch.remarks || "");
            setValue("Address", branch.address || "");
            setValue("Bank", branch.bank || "");
            setValue("Description", branch.description || "");
            setValue("TaxDescription", branch.taxDescription || "");
            setValue("CertifyDescription", branch.certifyDescription || "");
            setValue("GST_No", branch.gsT_No || "");
            setValue("Status", branch.Status || branch.status || "");
            setValue("CUID", branch.CUID || branch.cuid || "");
          } else {
            console.warn("No data found for BranchID:", id);
          }
        } catch (err) {
          setError("Failed to fetch Branch details.");
        } finally {
          setLoading(false);
        }
      };
      fetchBranch();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);
  const onSubmit = async (data) => {
    const payload = {
      BranchID: id || 0,
      BranchName: data.BranchName,
      CurrencyCode: data.CurrencyCode,
      ShortName: data.ShortName,
      CompanyID: parseInt(data.CompanyID, 10) || 0,
      Remarks: data.Remarks,
      Address: data.Address,
      Bank: data.Bank,
      Description: data.Description,
      TacDescription: data.TacDescription,
      CertifyDescription: data.CertifyDescription,
      GST_No: data.GST_No,
      Status: data.Status,
      CUID: parseInt(data.CUID, 10) || 0,
    };
    try {
      await AxiosInstance.post("/BranchMaster", payload);
      alert(
        id ? "Branch updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/BranchMasterTable");
    } catch (error) {
      alert("Error submitting data");
    }
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Branch?")) {
      try {
        await AxiosInstance.delete(`/BranchMaster/${id}`);
        alert("Branch deleted successfully!");
        navigate("/BranchMasterTable");
      } catch (error) {
        console.error("Error deleting branch:", error);
        alert("Failed to delete Branch");
      }
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (statusError)
    return (
      <p className="error">Failed to fetch status options: {statusError}</p>
    );
  if (companyError)
    return (
      <p className="error">Failed to fetch Company options: {companyError}</p>
    );
  if (cuidError)
    return <p className="error">Failed to fetch User options: {cuidError}</p>;
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        style={{
          height: "530px",
          overflow: "auto",
          padding: "20px",
          marginTop: "20px",
          // marginBottom: "70px",
        }}
      >
        <h1 className="ribbon" style={{ marginBottom: "30px", width: "300px" }}>
          Branch Master Form
        </h1>
        <Container>
          {/* RoleID DropDown */}
          <Row>
          <Col md={2} className="d-flex align-items-center">
  <Form.Label>BranchName :</Form.Label>
</Col>
<Col md={4}>
  <Form.Control
    type="text"
    placeholder="Enter your Branch name."
    {...register("BranchName", {
      required: "BranchName is required",
    })}
    style={{
      border: "none", // Removes the border
      borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
      outline: "none", // Removes the outline when focused
      boxShadow: "none", // Removes the shadow on focus
      padding: "5px 0", // Adds padding to the top and bottom for better appearance
      width: "100%",
      borderRadius: "0", // Decreases the width of the input box
    }}
  />
  <style>
    {`
      input::placeholder {
        font-size: 12px;  // Adjust the font size to your preference
      }
    `}
  </style>
</Col>

            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CurrencyCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="CurrencyCode">
                <Form.Control
                  type="text"
                  placeholder="Enter your CurrencyCode"
                  {...register("CurrencyCode", {
                    required: "CurrencyCode is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.CurrencyCode && (
                  <p style={{ color: "red" }}>{errors.CurrencyCode.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.ShortCode && (
                <p style={{ color: "red" }}>{errors.ShortCode.message}</p>
              )}
            </Col>

            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CompanyID:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="companies"
                {...register("companies", { required: true })}
                className="form-select"
                style={{
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  fontSize: "14px",
                  width: "330px", // Adjust the font size
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {companyOptions?.length > 0 ? (
                  companyOptions.map((companies, index) => (
                    <option
                      key={companies.value || index}
                      value={companies.value}
                    >
                      {companies.id || "Unnamed Status"}
                    </option>
                  ))
                ) : (
                  <option disabled>No company options available</option>
                )}
              </select>
              {errors.companies && (
                <p className="error-text">Please select a Company.</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
  <Col md={2} className="d-flex align-items-center">
    <Form.Label>Remarks:</Form.Label>
  </Col>
  <Col md={4}>
    <Form.Control
      type="text"
      placeholder="Enter Remarks."
      {...register("Remarks")}
      style={{
        border: "none",
        borderBottom: "2px solid rgb(133, 132, 130)", // Custom underline
        borderRadius: "0", // Removes rounded corners
        padding: "5px 0", // Adds padding to vertically align the text
        lineHeight: "1.5", // Adjust line height to align text vertically
        fontSize: "14px", // Adjust font size to match the input size
      }}
    />
    {errors.Remarks && (
      <p style={{ color: "red" }}>{errors.Remarks.message}</p>
    )}
  </Col>

  <Col md={2} className="d-flex align-items-center">
    <Form.Label>Address:</Form.Label>
  </Col>


            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                {...register("Address", {
                  required: "Address is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.Address && (
                <p style={{ color: "red" }}>{errors.Address.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Bank:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="Bank">
                <Form.Control
                  type="text"
                  placeholder="Enter your Bank"
                  {...register("Bank", {
                    required: "Bank is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "100%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.Bank && (
                  <p style={{ color: "red" }}>{errors.Bank.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> Description:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...register("Description")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.Description && (
                <p style={{ color: "red" }}>{errors.Description.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> TaxDescription:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter TaxDescription"
                {...register("TaxDescription")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.TaxDescription && (
                <p style={{ color: "red" }}>{errors.TaxDescription.message}</p>
              )}
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> CertifyDescription:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter CertifyDescription"
                {...register("CertifyDescription")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.CertifyDescription && (
                <p style={{ color: "red" }}>
                  {errors.CertifyDescription.message}
                </p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> GST_No:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter your GST_No"
                {...register("GST_No")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.GST_No && (
                <p style={{ color: "red" }}>{errors.GST_No.message}</p>
              )}
            </Col>

            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="status"
                {...register("Status", { required: true })}
                className="form-select" style={{
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  fontSize: "14px",
                  width: "330px",}}
              >
                <option value="" disabled>--Select--</option>
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
              {errors.status && (
                <p className="error-text">Please select a status.</p>
              )}
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CUID:</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="entryby"
                {...register("entryby", { required: true })}
                className="form-select"
                style={{
                  width: "80%", // Adjust width to match other inputs
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Add line style for consistency
                  padding: "5px 0",
                  borderRadius: "0", // Add padding to match input boxes
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
        onCancel={() => navigate("/BranchMasterTable")}
      />
    </>
  );
}
