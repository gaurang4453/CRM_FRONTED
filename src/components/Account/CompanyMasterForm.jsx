import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";

export default function CompanyMasterForm() {
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
      const fetchCompany = async () => {
        try {
          const response = await AxiosInstance.get(`/CompanyMaster/${id}`);
          const company = response.data.data;
          if (company) {
            setValue("CompanyID", company.CompanyID || company.companyID);
            setValue("CompanyName", company.CompanyName || company.companyName);
            setValue("ShortCode", company.shortCode || "");
            setValue("State", company.state || "");
            setValue("TINNo", company.TINNo || company.tinNo);
            setValue("CST", company.cst || "");
            setValue("PANNO", company.panno || "");
            setValue("ServiceTaxNo", company.serviceTaxNo || "");
            setValue("SSINO", company.ssino || "");
            setValue("TANNO", company.tanno || "");
            setValue("ECCNo", company.eccNo || "");
            setValue("Range", company.range || "");
            setValue("Division", company.division || "");
            setValue("Commisioner", company.commisioner || "");
            setValue("GST_No", company.gsT_No || "");
            setValue("CurrencyCode", company.currencyCode || "");
            setValue("Address", company.address || "");
            setValue("Bank", company.bank || "");
            setValue("Description", company.description || "");
            setValue("TaxDescription", company.taxDescription || "");
            setValue("CertifyDescription", company.certifyDescription || "");
            setValue("Declaration", company.declaration || "");
            setValue("Jurisdiction", company.jurisdiction || "");
            setValue("AuthPerson", company.authPerson || "");
            setValue("Col1", company.col1 || "");
            setValue("status", company.status || "");
            setValue("CUID", company.cuid || "");
          } else {
            console.warn("No data found for companyID:", id);
          }
        } catch (err) {
          setError("Failed to fetch Company details.");
        } finally {
          setLoading(false);
        }
      };
      fetchCompany();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      CompanyID: id || 0,
      CompanyName: data.CompanyName,
      ShortCode: data.ShortCode,
      State: data.State,
      TINNo: data.TINNo,
      CST: data.CST,
      PANNO: data.PANNO,
      ServiceTaxNo: data.ServiceTaxNo,
      SSINO: data.SSINO,
      TANNO: data.TANNO,
      ECCNo: data.ECCNo,
      Range: data.Range,
      Division: data.Division,
      Commisioner: data.Commisioner,
      GST_No: data.GST_No,
      CurrencyCode: data.CurrencyCode,
      Address: data.Address,
      Bank: data.Bank,
      Description: data.Description,
      TaxDescription: data.TaxDescription,
      CertifyDescription: data.CertifyDescription,
      Declaration: data.Declaration,
      Jurisdiction: data.Jurisdiction,
      AuthPerson: data.AuthPerson,
      Col1: data.Col1,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      await AxiosInstance.post("/CompanyMaster", payload);
      alert(
        id ? "Company updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/CompanyMasterTable");
    } catch (error) {
      alert("Error submitting data");
    }
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Company?")) {
      try {
        await AxiosInstance.delete(`/CompanyMaster/${id}`);
        alert("Company deleted successfully!");
        navigate("/CompanyMasterTable");
      } catch (error) {
        alert("Failed to delete Company.");
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
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          height: "950px",
        //   overflow: "auto",
        //   padding: "20px",
          marginTop: "70px",

        //   marginBottom: "0px",
        }}
      >
        <h1 className="ribbon" style={{ marginBottom: "30px", width: "300px" }}>
          Company Master Form
        </h1>
        <Container>
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Company Name:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="CompanyName">
                <Form.Control
                  type="text"
                  placeholder="Enter your Company name."
                  {...register("CompanyName", {})}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                    borderRadius: "0", // Removes the curved corners
                  }}
                />
                {errors.CompanyName && (
                  <p style={{ color: "red" }}>{errors.CompanyName.message}</p>
                )}
              </Form.Group>
            </Col>

            <Col md={2} className="d-flex align-items-center">
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required.",
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
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>State:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="State">
                <Form.Control
                  type="text"
                  placeholder="Enter your State"
                  {...register("State", {
                    required: "State is required.",
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
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> TINNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="TINNo"
                placeholder="Enter your TINNo"
                {...register("TINNo", {})}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)",
                  borderRadius: "0",
                }}
              />
              {errors.TINNo && (
                <p style={{ color: "red" }}>{errors.TINNo.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row className="g-3">
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CST:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="CST">
                <Form.Control
                  type="text"
                  placeholder="Enter your CST"
                  {...register("CST", {})}
                  style={{
                    border: "none",
                    borderBottom: "2px solid rgb(133, 132, 130)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "5px 0",
                    width: "80%",
                    borderRadius: "0",
                  }}
                />
                {errors.CST && (
                  <p style={{ color: "red" }}>{errors.CST.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> PANNO:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter your PANNO"
                {...register("PANNO", {})}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)",
                  borderRadius: "0",
                }}
              />
              {errors.PANNO && (
                <p style={{ color: "red" }}>{errors.PANNO.message}</p>
              )}
            </Col>
          </Row>
          <br />

          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>ServiceTaxNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="ServiceTaxNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your ServiceTaxNo"
                  {...register("ServiceTaxNo")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0",
                  }}
                />
                {errors.ServiceTaxNo && (
                  <p style={{ color: "red" }}>{errors.ServiceTaxNo.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> SSINO:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter SSINO"
                {...register("SSINO")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.SSINO && (
                <p style={{ color: "red" }}>{errors.SSINO.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>TANNO:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="TANNO">
                <Form.Control
                  type="text"
                  placeholder="Enter your TANNO"
                  {...register("TANNO")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.TANNO && (
                  <p style={{ color: "red" }}>{errors.TANNO.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> ECCNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter ECCNo"
                {...register("ECCNo")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.ECCNo && (
                <p style={{ color: "red" }}>{errors.ECCNo.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Range:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="Range">
                <Form.Control
                  type="text"
                  placeholder="Enter your Range"
                  {...register("Range")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.Range && (
                  <p style={{ color: "red" }}>{errors.Range.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> Division:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Division"
                {...register("Division")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.Division && (
                <p style={{ color: "red" }}>{errors.Division.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Commisioner:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="Commisioner">
                <Form.Control
                  type="text"
                  placeholder="Enter your Commisioner"
                  {...register("Commisioner")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.Commisioner && (
                  <p style={{ color: "red" }}>{errors.Commisioner.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> GST_No:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter your GST_No"
                {...register("GST_No", {
                  required: "GST_No is required.",
                })}
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
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CurrencyCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="CurrencyCode">
                <Form.Control
                  type="text"
                  placeholder="Enter your CurrencyCode"
                  {...register("CurrencyCode", {})}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
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
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> Address:</Form.Label>
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
                    required: "Bank is required.",
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
              <Form.Label>TaxDescription:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="TaxDescription">
                <Form.Control
                  type="text"
                  placeholder="Enter your TaxDescription"
                  {...register("TaxDescription")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.TaxDescription && (
                  <p style={{ color: "red" }}>
                    {errors.TaxDescription.message}
                  </p>
                )}
              </Form.Group>
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
              <Form.Label>Declaration:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="Declaration">
                <Form.Control
                  type="text"
                  placeholder="Enter your Declaration"
                  {...register("Declaration")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.Declaration && (
                  <p style={{ color: "red" }}>{errors.Declaration.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> Jurisdiction:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Jurisdiction"
                {...register("Jurisdiction")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.Jurisdiction && (
                <p style={{ color: "red" }}>{errors.Jurisdiction.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>AuthPerson:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="AuthPerson">
                <Form.Control
                  type="text"
                  placeholder="Enter your AuthPerson"
                  {...register("AuthPerson")}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(133, 132, 130)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%",
                    borderRadius: "0", // Decreases the width of the input box
                  }}
                />
                {errors.AuthPerson && (
                  <p style={{ color: "red" }}>{errors.AuthPerson.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> Col1:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Col1"
                {...register("Col1")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.Col1 && (
                <p style={{ color: "red" }}>{errors.Col1.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <select
                id="status"
                {...register("status", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", 
                  border: "2px solid rgb(243, 185, 78)",// Decrease the height
                  padding: "0.2rem", // Reduce padding
                  fontSize: "14px",
                  width: "290px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {statusOptions?.length > 0 ? (
                  statusOptions.map((status, index) => (
                    <option key={status.id || index} value={status.id}>
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
            <Col md={4}>
              <select
                id="entryby"
                {...register("entryby", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", 
                  border: "2px solid rgb(243, 185, 78)",// Decrease the height
                  padding: "0.2rem", // Reduce padding
                  fontSize: "14px",
                  width: "100%", // Add padding to match input boxes
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
        onCancel={() => navigate("/CompanyMasterTable")}
      />
    </>
  );
}
