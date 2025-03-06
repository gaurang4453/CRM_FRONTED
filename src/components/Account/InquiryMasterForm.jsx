import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form, Table, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";
import SubTableInquiryMaster from "../SubTable/SubTableInquiryMaster";

export default function InquiryMasterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data: statusOptions, error: statusError } = useDropdownData("status");
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");
  const { data: branchesOptions, error: branchesError } =
    useDropdownData("branches");
  const { data: companiesOptions, error: companiesError } =
    useDropdownData("companies");

  // useEffect(() => {
  //   const fetchItemMasterOptions = async () => {
  //     try {
  //       const response = await AxiosInstance.get("/ItemMaster");
  //       setItemMasterOptions(response.data.data);
  //     } catch (err) {
  //       console.error("Error fetching Item Master options:", err);
  //     }
  //   };

  //   fetchItemMasterOptions();
  // }, []);

  useEffect(() => {
    if (id && id !== "undefined") {
      console.log("Received ID:", id);
      const fetchInquiryMaster = async () => {
        try {
          const response = await AxiosInstance.get(`/InquiryMaster/${id}`);
          const Inquiry = response.data.data;
          if (Inquiry) {
            setValue("InquiryID", Inquiry.inquiryID);
            setValue("InquiryNo", Inquiry.inquiryNo);
            setValue("Date", Inquiry.date);
            setValue("BranchID", Inquiry.branchID);
            setValue("CompanyID", Inquiry.companyID);
            setValue("ReferenceBy", Inquiry.referenceBy);
            setValue("PartyName", Inquiry.partyName);
            setValue("Address", Inquiry.address);
            setValue("Area", Inquiry.area);
            setValue("State", Inquiry.state);
            setValue("ContactName", Inquiry.contactName);
            setValue("Mobile", Inquiry.mobile);
            setValue("Mobile2", Inquiry.mobile2);
            setValue("EmailID", Inquiry.emailID);
            setValue("EmailID2", Inquiry.emailID2);
            setValue("Remarks", Inquiry.remarks);
            setValue("Currency", Inquiry.currency);
            setValue("CF", Inquiry.cf);
            setValue("SendMail", Inquiry.sendMail);
            setValue("MktBy", Inquiry.mktBy);
            setValue("Auth", Inquiry.auth);
            setValue("AuthBy", Inquiry.authBy);
            setValue("Status", Inquiry.status);
            setValue("CUID", Inquiry.cuid);
          } else {
            console.warn("No data found for InquiryID:", id);
          }
        } catch (err) {
          setError("Failed to fetch InquiryMaster details.");
        } finally {
          setLoading(false);
        }
      };
      fetchInquiryMaster();
    } else {
      setLoading(false);
    }
  }, [id, setValue, cuidOptions]);

  const onSubmit = async (data) => {
    const payload = {
      InquiryID: id || 0,
      InquiryNo: data.InquiryNo,
      Date: data.Date,
      BranchID: data.BranchID,
      CompanyID: data.CompanyID,
      ReferenceBy: data.ReferenceBy,
      PartyName: data.PartyName,
      Address: data.Address,
      Area: data.Area,
      State: data.State,
      ContactName: data.ContactName,
      Mobile: data.Mobile,
      Mobile2: data.Mobile2,
      EmailID: data.EmailID,
      EmailID2: data.EmailID2,
      Remarks: data.Remarks,
      Currency: data.Currency,
      CF: data.CF,
      SendMail: data.SendMail,
      MktBy: data.MktBy,
      Auth: data.Auth,
      AuthBy: data.AuthBy,
      Status: data.Status,
      CUID: parseInt(data.CUID, 10) || 0,
      items: items,
    };

    try {
      await AxiosInstance.post("/InquiryMaster", payload);
      alert(
        id
          ? "InquiryMaster updated successfully!"
          : "Successfully submitted data"
      );
      reset();
      navigate("/InquiryMasterTable");
    } catch (error) {
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this InquiryMaster?")) {
      try {
        await AxiosInstance.delete(`/InquiryMaster/${id}`);
        alert("InquiryMaster deleted successfully!");
        navigate("/InquiryMasterTable");
      } catch (error) {
        alert("Failed to delete InquiryMaster");
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

  if (branchesError)
    return (
      <p className="error">Failed to fetch Branch options: {branchesError}</p>
    );
  if (companiesError)
    return (
      <p className="error">Failed to fetch Company options: {companiesError}</p>
    );
  return (
    <>
      <div style={{ marginTop: "80px" }}></div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="allform"
        style={{ marginTop: "20px" }}
      >
        <h1 className="ribbon">
          {id ? "Edit Property" : "Inquiry Master Form"}
        </h1>
        <Container>
          {/* Main Form Fields */}
          <Row>
            <Col md={1} className="d-flex align-items-center ">
              <Form.Label>InquiryNo :</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Enter your Inquiry No."
                {...register("InquiryNo")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "85%",
                  borderRadius: "0",
                }}
              />
              {errors.Inquiry && (
                <p style={{ color: "red" }}>{errors.Inquiry.message}</p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Date :</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Group controlId="Date">
                <Form.Control
                  type="Date"
                  placeholder="Enter your Date."
                  {...register("Date", {
                    required: "Date is required.",
                  })}
                  style={{
                    border: "none",
                    borderBottom: "2px solid rgb(243, 185, 78)",
                    outline: "none",
                    boxShadow: "none",
                    padding: "5px 0",
                    width: "85%",
                    borderRadius: "0",
                  }}
                />
                {errors.Date && (
                  <p style={{ color: "red" }}>{errors.Date.message}</p>
                )}
              </Form.Group>
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>BranchID:</Form.Label>
            </Col>
            <Col md={2}>
              <select
                id="BranchID"
                {...register("BranchID", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "295px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {branchesOptions?.length > 0 ? (
                  branchesOptions.map((branches) => (
                    <option key={branches.id} value={branches.id}>
                      {branches.value || "Unnamed branch"}
                    </option>
                  ))
                ) : (
                  <option disabled>No branches options available</option>
                )}
              </select>
              {errors.branches && (
                <p className="error-text">Please select a branch.</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CompanyID:</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="CompanyID"
                {...register("CompanyID")}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(133, 132, 130)",
                  fontSize: "14px",
                  width: "85%",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {companiesOptions?.length > 0 ? (
                  companiesOptions.map((companies) => (
                    <option key={companies.id} value={companies.id}>
                      {companies.value || "Unnamed Company"}
                    </option>
                  ))
                ) : (
                  <option disabled>No companies options available</option>
                )}
              </select>
              {errors.companies && (
                <p className="error-text">Please select a company.</p>
              )}
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>ReferenceBy:</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="Status"
                {...register("Status", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "85%",
                }}
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

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>PartyName :</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Enter your PartyName."
                {...register("PartyName", {
                  required: "PartyName is required.",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.PartyName && (
                <p style={{ color: "red" }}>{errors.PartyName.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Address :</Form.Label>
            </Col>
            <Col md={11}>
              <Form.Control
                as="textarea"
                rows={2}
                {...register("Address", { required: "Address is required." })}
                placeholder="Enter your text here..."
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.Address && (
                <p style={{ color: "red" }}>{errors.Address.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Area :</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your Area."
                {...register("Area", { required: "Area is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "85%",
                  borderRadius: "0",
                }}
              />
              {errors.Area && (
                <p style={{ color: "red" }}>{errors.Area.message}</p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>State :</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your State."
                {...register("State", { required: "State is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.State && (
                <p style={{ color: "red" }}>{errors.State.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>ContactName:</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Enter your ContactName."
                {...register("ContactName", {
                  required: "ContactName is required.",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "85%",
                  borderRadius: "0",
                }}
              />
              {errors.ContactName && (
                <p style={{ color: "red" }}>{errors.ContactName.message}</p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Mobile :</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Enter your Mobile."
                {...register("Mobile", { required: "Mobile is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "85%",
                  borderRadius: "0",
                }}
              />
              {errors.Mobile && (
                <p style={{ color: "red" }}>{errors.Mobile.message}</p>
              )}
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Mobile2 :</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Enter your second Mobile."
                {...register("Mobile2", {
                  required: "Second Mobile is required.",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.Mobile2 && (
                <p style={{ color: "red" }}>{errors.Mobile2.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Email :</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="email"
                placeholder="Enter your Email."
                {...register("EmailID", { required: "Email is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "90%",
                  borderRadius: "0",
                }}
              />
              {errors.EmailID && (
                <p style={{ color: "red" }}>{errors.EmailID.message}</p>
              )}
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                {...register("SendMail")}
                label="Send Mail"
              />
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>EmailID2 :</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="email"
                placeholder="Enter your second Email."
                {...register("EmailID2", {
                  required: "Second Email is required.",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "125%",
                  borderRadius: "0",
                }}
              />
              {errors.EmailID2 && (
                <p style={{ color: "red" }}>{errors.EmailID2.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Remarks :</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter your Remarks."
                {...register("Remarks")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.Remarks && (
                <p style={{ color: "red" }}>{errors.Remarks.message}</p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Currency :</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your Currency."
                {...register("Currency", { required: "Currency is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.Currency && (
                <p style={{ color: "red" }}>{errors.Currency.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CF :</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Enter your CF."
                {...register("CF", { required: "CF is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "5px 0",
                  width: "100%",
                  borderRadius: "0",
                }}
              />
              {errors.CF && <p style={{ color: "red" }}>{errors.CF.message}</p>}
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="Status"
                {...register("Status", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "295px",
                }}
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
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>CUID:</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="CUID"
                {...register("CUID", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "295px",
                }}
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
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>MktBy:</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="MktBy"
                {...register("MktBy", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "295px",
                }}
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
              {errors.MktBy && (
                <p className="error-text">Please select a User.</p>
              )}
            </Col>

            <Col md={2} className="d-flex align-items-center">
              <Form.Check type="checkbox" label="Auth" {...register("Auth")} />
            </Col>

            <Col md={1} className="d-flex align-items-center">
              <Form.Label>AuthBy:</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="AuthBy"
                {...register("AuthBy", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px",
                  padding: "0.2rem",
                  border: "2px solid rgb(133, 132, 130)",
                  fontSize: "14px",
                  width: "173%",
                }}
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
              {errors.AuthBy && (
                <p className="error-text">Please select a User.</p>
              )}
            </Col>
          </Row>
          <br />
          <Row></Row>
        </Container>
        <SubTableInquiryMaster />
      </Form>
      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/InquiryMasterTable")}
      />
    </>
  );
}
