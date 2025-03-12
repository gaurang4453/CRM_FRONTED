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
  const { data: companyOptions, error: companyError } =
    useDropdownData("companies");
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
            setValue(
              "BranchName",
              branch.branchName || branch.BranchName || ""
            );
            setValue(
              "CurrencyCode",
              branch.currencyCode || branch.CurrencyCode || ""
            );
            setValue("ShortName", branch.shortName || branch.ShortName || "");
            setValue("CompanyID", branch.companyID || branch.CompanyID || "");
            setValue("Remarks", branch.remarks || branch.Remarks || "");
            setValue("Address", branch.address || branch.Address || "");
            setValue("Bank", branch.bank || branch.Bank || "");
            setValue(
              "Description",
              branch.description || branch.Description || ""
            );
            setValue(
              "TaxDescription",
              branch.taxDescription || branch.TaxDescription || ""
            );
            setValue(
              "CertifyDescription",
              branch.certifyDescription || branch.CertifyDescription || ""
            );
            setValue("GST_No", branch.gsT_No || branch.GST_No || "");
            setValue("Status", branch.status || branch.Status || "");
            setValue("CUID", branch.cuid || branch.CUID || "");

            // Set CUID properly
            if (cuidOptions && cuidOptions.length > 0) {
              const selectedUser = cuidOptions.find(
                (user) => user.id == (branch.cuid || branch.CUID)
              );
              if (selectedUser) {
                setValue("CUID", selectedUser.id);
              }
            }
          } else {
            console.warn("No data found for BranchID:", id);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Failed to fetch Branch details.");
        } finally {
          setLoading(false);
        }
      };
      fetchBranch();
    } else {
      setLoading(false);
    }
  }, [id, setValue, cuidOptions]);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

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
      TaxDescription: data.TaxDescription,
      CertifyDescription: data.CertifyDescription,
      GST_No: data.GST_No,
      Status: data.Status || data.status,
      CUID: parseInt(data.cuid, 10) || 0,
    };

    console.log("Payload being sent:", payload);

    try {
      await AxiosInstance.post("/BranchMaster", payload);
      alert(
        id ? "Branch updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/BranchMasterTable");
    } catch (error) {
      console.error("Submit error:", error);
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
      <form onSubmit={handleSubmit(onSubmit)} className="allform">
        <h1 className="ribbon">
          {id ? "Branch Master Form" : "Branch Master Form"}
        </h1>
        <Container>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Branch Name</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your Branch name."
                {...register("BranchName", {
                  required: "BranchName is required",
                })}
                className="requiredinputfieldstyle {
"
              />
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Currency Code</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="CurrencyCode">
                <Form.Control
                  type="text"
                  placeholder="Enter your CurrencyCode."
                  {...register("CurrencyCode", {
                    required: "CurrencyCode is required.",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.CurrencyCode && (
                  <p style={{ color: "red" }}>{errors.CurrencyCode.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Short Name</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter ShortName."
                {...register("ShortName", {
                  required: "ShortName is required.",
                })}
                className="requiredinputfieldstyle"
              />
              {errors.ShortName && (
                <p style={{ color: "red" }}>{errors.ShortName.message}</p>
              )}
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Company ID</Form.Label>
            </Col>

            <Col md={5}>
              <select
                id="CompanyID"
                {...register("CompanyID", {
                  required: "CompanyID is required.",
                })}
                className="requireddropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {companyOptions?.length > 0 ? (
                  companyOptions.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.value || "Unnamed Company"}
                    </option>
                  ))
                ) : (
                  <option disabled>No company options available</option>
                )}
              </select>
              {errors.CompanyID && (
                <p className="error-text">Please select a Company.</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Remarks</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Remarks."
                {...register("Remarks")}
                className="inputfieldstyle"
              />
              {errors.Remarks && (
                <p style={{ color: "red" }}>{errors.Remarks.message}</p>
              )}
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Address</Form.Label>
            </Col>

            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                {...register("Address", {
                  required: "Address is required",
                })}
                className="requiredinputfieldstyle"
              />
              {errors.Address && (
                <p style={{ color: "red" }}>{errors.Address.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Bank</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="Bank">
                <Form.Control
                  type="text"
                  placeholder="Enter your Bank"
                  {...register("Bank", {
                    required: "Bank is required",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.Bank && (
                  <p style={{ color: "red" }}>{errors.Bank.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Description:</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...register("Description")}
                className="inputfieldstyle"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Tax Description</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter TaxDescription"
                {...register("TaxDescription")}
                className="inputfieldstyle"
              />
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Certify Description</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter CertifyDescription"
                {...register("CertifyDescription")}
                className="inputfieldstyle"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>GST_No</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your GST_No"
                {...register("GST_No")}
                className="inputfieldstyle"
              />
            </Col>

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
      </form>

      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/BranchMasterTable")}
      />
    </>
  );
}
