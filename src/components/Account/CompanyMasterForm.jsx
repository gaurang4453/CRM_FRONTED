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
            setValue("CUID", company.cuid); // Corrected line
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
      CUID: parseInt(data.CUID, 10) || 0,
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
      <Form onSubmit={handleSubmit(onSubmit)} className="allform" style={{ marginTop: "45px" }}>
        <h1 className="ribbon">
          {id ? "Edit Property" : "Company Master Form"}
        </h1>
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Company Name</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="CompanyName">
                <Form.Control
                  type="text"
                  placeholder="Enter your Company name."
                  {...register("CompanyName", {})}
                  className="inputfieldstyle"
                />
                {errors.CompanyName && (
                  <p style={{ color: "red" }}>{errors.CompanyName.message}</p>
                )}
              </Form.Group>
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Short Code</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required.",
                })}
                className="requiredinputfieldstyle"
              />
              {errors.ShortCode && (
                <p style={{ color: "red" }}>{errors.ShortCode.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>State</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="State">
                <Form.Control
                  type="text"
                  placeholder="Enter your State"
                  {...register("State", {
                    required: "State is required.",
                  })}
                  className="inputfieldstyle"
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> TIN No</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="TINNo"
                placeholder="Enter your TINNo"
                {...register("TINNo", {})}
                className="inputfieldstyle"
              />
              {errors.TINNo && (
                <p style={{ color: "red" }}>{errors.TINNo.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row className="g-3">
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CST</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="CST">
                <Form.Control
                  type="text"
                  placeholder="Enter your CST"
                  {...register("CST", {})}
                  className="inputfieldstyle"
                />
                {errors.CST && (
                  <p style={{ color: "red" }}>{errors.CST.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> PAN NO</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your PANNO"
                {...register("PANNO", {})}
                className="inputfieldstyle"
              />
              {errors.PANNO && (
                <p style={{ color: "red" }}>{errors.PANNO.message}</p>
              )}
            </Col>
          </Row>
          <br />

          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Service Tax No</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="ServiceTaxNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your ServiceTaxNo"
                  {...register("ServiceTaxNo")}
                  className="inputfieldstyle"
                />
                {errors.ServiceTaxNo && (
                  <p style={{ color: "red" }}>{errors.ServiceTaxNo.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> SSI NO</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter SSINO"
                {...register("SSINO")}
                className="inputfieldstyle"
              />
              {errors.SSINO && (
                <p style={{ color: "red" }}>{errors.SSINO.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>TAN NO</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="TANNO">
                <Form.Control
                  type="text"
                  placeholder="Enter your TANNO"
                  {...register("TANNO")}
                  className="inputfieldstyle"
                />
                {errors.TANNO && (
                  <p style={{ color: "red" }}>{errors.TANNO.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> ECC  No</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter ECCNo"
                {...register("ECCNo")}
                className="inputfieldstyle"
              />
              {errors.ECCNo && (
                <p style={{ color: "red" }}>{errors.ECCNo.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Range</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="Range">
                <Form.Control
                  type="text"
                  placeholder="Enter your Range"
                  {...register("Range")}
                  className="inputfieldstyle"
                />
                {errors.Range && (
                  <p style={{ color: "red" }}>{errors.Range.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Division</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Division"
                {...register("Division")}
                className="inputfieldstyle"
              />
              {errors.Division && (
                <p style={{ color: "red" }}>{errors.Division.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Commisioner</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="Commisioner">
                <Form.Control
                  type="text"
                  placeholder="Enter your Commisioner"
                  {...register("Commisioner")}
                  className="inputfieldstyle"
                />
                {errors.Commisioner && (
                  <p style={{ color: "red" }}>{errors.Commisioner.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> GST_No</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your GST_No"
                {...register("GST_No", {
                  required: "GST_No is required.",
                })}
                className="requiredinputfieldstyle"
              />
              {errors.GST_No && (
                <p style={{ color: "red" }}>{errors.GST_No.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Currency Code</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="CurrencyCode">
                <Form.Control
                  type="text"
                  placeholder="Enter your CurrencyCode"
                  {...register("CurrencyCode", {})}
                  className="inputfieldstyle"
                />
                {errors.CurrencyCode && (
                  <p style={{ color: "red" }}>{errors.CurrencyCode.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Address</Form.Label>
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
                    required: "Bank is required.",
                  })}
                  className="requiredinputfieldstyle"
                />
                {errors.Bank && (
                  <p style={{ color: "red" }}>{errors.Bank.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Description</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...register("Description")}
                className="inputfieldstyle"
              />
              {errors.Description && (
                <p style={{ color: "red" }}>{errors.Description.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Tax Description</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="TaxDescription">
                <Form.Control
                  type="text"
                  placeholder="Enter your TaxDescription"
                  {...register("TaxDescription")}
                  className="inputfieldstyle"
                />
                {errors.TaxDescription && (
                  <p style={{ color: "red" }}>
                    {errors.TaxDescription.message}
                  </p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Certify Description</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter CertifyDescription"
                {...register("CertifyDescription")}
                className="inputfieldstyle"
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
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Declaration</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="Declaration">
                <Form.Control
                  type="text"
                  placeholder="Enter your Declaration"
                  {...register("Declaration")}
                  className="inputfieldstyle"
                />
                {errors.Declaration && (
                  <p style={{ color: "red" }}>{errors.Declaration.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Jurisdiction</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Jurisdiction"
                {...register("Jurisdiction")}
                className="inputfieldstyle"
              />
              {errors.Jurisdiction && (
                <p style={{ color: "red" }}>{errors.Jurisdiction.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Auth Person</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group controlId="AuthPerson">
                <Form.Control
                  type="text"
                  placeholder="Enter your AuthPerson"
                  {...register("AuthPerson")}
                  className="inputfieldstyle"
                />
                {errors.AuthPerson && (
                  <p style={{ color: "red" }}>{errors.AuthPerson.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Col1</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Col1"
                {...register("Col1")}
                className="inputfieldstyle"
              />
              {errors.Col1 && (
                <p style={{ color: "red" }}>{errors.Col1.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Status</Form.Label>
            </Col>
            <Col md={5} className="d-flex align-items-center">
              <select
                id="status"
                {...register("status", { required: true })}
                className="form-select requireddropdown"
                defaultValue=""
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

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CUID</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="CUID"
                {...register("CUID", { required: true })}
                className="form-select requireddropdown"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {cuidOptions?.length > 0 ? (
                  cuidOptions.map((user, index) => (
                    <option key={user.id} value={user.id}>
                      {user.value || "Unnamed User"}
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