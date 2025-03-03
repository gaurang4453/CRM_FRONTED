import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";

export default function InquiryMasterForm() {
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
      const fetchInquiryMaster = async () => {
        try {
          const response = await AxiosInstance.get(`/InquiryMaster/${id}`);
          const InquiryMaster = response.data.data;
          console.log("Fetched InquiryMaster:", InquiryMaster);
          if (InquiryMaster) {
            setValue(
              "InquiryNo",
              InquiryMaster.InquiryNo || InquiryMaster.inquiryNo
            );
            setValue("Date", InquiryMaster.Date || InquiryMaster.date);
            setValue(
              "BranchID",
              InquiryMaster.BranchID || InquiryMaster.branchID
            );
            setValue(
              "CompanyID",
              InquiryMaster.CompanyID || InquiryMaster.companyID
            );
            setValue(
              "ReferenceBy",
              InquiryMaster.ReferenceBy || InquiryMaster.referenceBy
            );
            setValue(
              "PartyName",
              InquiryMaster.PartyName || InquiryMaster.partyName
            );
            setValue("Address", InquiryMaster.Address || InquiryMaster.address);
            setValue("Area ", InquiryMaster.Area || InquiryMaster.area);
            setValue("State ", InquiryMaster.State || InquiryMaster.state);
            setValue(
              "ContactName ",
              InquiryMaster.ContactName || InquiryMaster.contactName
            );
            setValue("Mobile ", InquiryMaster.Mobile || InquiryMaster.mobile);
            setValue(
              "Mobile2 ",
              InquiryMaster.Mobile2 || InquiryMaster.mobile2
            );
            setValue(
              "EmailID ",
              InquiryMaster.EmailID || InquiryMaster.emailID
            );
            setValue(
              "EmailID2 ",
              InquiryMaster.EmailID2 || InquiryMaster.emailID2
            );
            setValue(
              "Remarks ",
              InquiryMaster.Remarks || InquiryMaster.remarks
            );
            setValue(
              "Currency ",
              InquiryMaster.Currency || InquiryMaster.currency
            );
            setValue("CF ", InquiryMaster.CF || InquiryMaster.cf);
            setValue(
              "SendMail ",
              InquiryMaster.SendMail || InquiryMaster.sendMail
            );
            setValue("MktBy ", InquiryMaster.MktBy || InquiryMaster.mktBy);
            setValue("Auth ", InquiryMaster.Auth || InquiryMaster.auth);
            setValue("AuthBy ", InquiryMaster.AuthBy || InquiryMaster.authBy);
            setValue("Status", InquiryMaster.Status || InquiryMaster.status);
            setValue("CUID", InquiryMaster.cuid || InquiryMaster.CUID);
          } else {
            console.warn("No data found for InquiryID:", id);
          }
        } catch (err) {
          console.error("Fetch error:", err);
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
    console.log("Form data submitted:", data);

    const payload = {
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
    };
    console.log("Payload being sent:", payload);

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
      console.error("Submit error:", error);
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
        console.error("Error deleting InquiryMaster:", error);
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
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        style={{
          height: "530px",
          // overflow: "auto",
          // padding: "20px",
          marginTop: "20px",
        }}
      >
        <h1 className="ribbon">{id ? "Edit Property" : "Inquiry Master Form"}</h1>
        <Container>
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Inquiry :</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter your Inquiry."
                {...register("Inquiry", {
                  required: "Inquiry is required.",
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
              {errors.Inquiry && (
                <p style={{ color: "red" }}>{errors.Inquiry.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={4}>
              <select
                id="Status"
                {...register("Status", { required: true })}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  border: "2px solid rgb(243, 185, 78)",
                  fontSize: "14px",
                  width: "360px",
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
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CUID:</Form.Label>
            </Col>
            <Col md={4}>
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
                  width: "360px",
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
        </Container>
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
