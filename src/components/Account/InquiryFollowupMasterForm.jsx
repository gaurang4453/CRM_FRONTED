import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";
const today = new Date().toISOString().split("T")[0];

export default function InquiryFollowUpMasterForm() {
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

  const { data: branchidOptions, error: branchidError } =
    useDropdownData("branches");
  const { data: onacidOptions, error: onacidError } =
    useDropdownData("companies");
  const { data: inquiryidOptions, error: inquiryidError } =
    useDropdownData("inquiryid");
  const { data: nextprocessOptions, error: nextprocesssError } =
    useDropdownData("nextprocess");
  const { data: statusOptions, error: statusError } = useDropdownData("status");
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");

  useEffect(() => {
    if (id && id !== "undefined") {
      console.log("Received ID:", id);
      const fetchInquiryFollowupMaster = async () => {
        try {
          const response = await AxiosInstance.get(
            `/InquiryFollowupMaster/${id}`
          );
          const followupmaster = response.data.data;
          if (followupmaster) {
            setValue(
              "InquiryFollowupNo",
              followupmaster.InquiryFollowupNo ||
                followupmaster.inquiryFollowupNo
            );
            setValue(
              "BranchID",
              followupmaster.BranchID || followupmaster.branchID
            );
            setValue("OnAcID", followupmaster.OnAcID || followupmaster.onAcID);
            setValue(
              "InquiryID",
              followupmaster.InquiryID || followupmaster.inquiryID
            );
            setValue(
              "FollowupRemarks",
              followupmaster.FollowupRemarks || followupmaster.followupRemarks
            );
            setValue(
              "NextProcess",
              followupmaster.NextProcess || followupmaster.nextProcess
            );
            setValue(
              "Remarks",
              followupmaster.Remarks || followupmaster.remarks
            );
            setValue("Status", followupmaster.status||followupmaster.Status);
            setValue("CUID", followupmaster.CUID || followupmaster.cuid);
            setValue(
              "NextFollowupDate",
              followupmaster.NextFollowupDate || followupmaster.nextFollowupDate
            );
            setValue("Date", followupmaster.Date || followupmaster.Date);
          } else {
            console.warn("No data found for InquiryFollowupNo:", id);
          }
        } catch (err) {
          // setError("Failed to fetch followup details.");
        } finally {
          setLoading(false);
        }
      };
      fetchInquiryFollowupMaster();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      InquiryFollowupID: id || 0,
      InquiryFollowupNo: data.InquiryFollowupNo,
      BranchID: data.BranchID,
      OnAcID: data.OnAcID,
      InquiryID: data.InquiryID,
      FollowupRemarks: data.FollowupRemarks,
      NextProcess: data.NextProcess,
      Remarks: data.Remarks,
      Status: data.Status,
      NextFollowupDate: data.NextFollowupDate,
      CUID: data.CUID,
      Date: data.Date,
    };
    try {
      await AxiosInstance.post("/InquiryFollowupMaster", payload);
      alert(
        id
          ? "InquiryFollowup Master updated successfully!"
          : "Successfully submitted data"
      );
      reset();
      navigate("/InquiryFollowupMasterTable");
    } catch (error) {
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Followup?")) {
      try {
        await AxiosInstance.delete(`/InquiryFollowupMaster/${id}`);
        alert("Inquiry Followup deleted successfully!");
        navigate("/InquiryFollowupMasterTable");
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (statusError)
    return (
      <p className="error">Failed to fetch status options: {statusError}</p>
    );

  if (onacidError)
    return (
      <p className="error">Failed to fetch company options: {onacidError}</p>
    );

  if (cuidError)
    return (
      <p className="error">
        Failed to fetch Inquiry Followup options: {CUIDError}
      </p>
    );

  if (branchidError)
    return (
      <p className="error">Failed to fetch Branch options: {branchidError}</p>
    );
  if (nextprocesssError)
    return (
      <p className="error">
        Failed to fetch status options: {nextprocesssError}
      </p>
    );
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="allform">
        <h1 className="ribbon">
          {id ? "Edit Property" : "Inquiry Followup Master"}
        </h1>
        <Container style={{ marginTop: "-15px" }}>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Inquiry Followup No</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Group controlId="InquiryFollowupNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your Inquiry Followup No.."
                  {...register("InquiryFollowupNo", {})}
                  className="inputfieldstyle"
                  disabled
                />
                {errors.InquiryFollowupNo && (
                  <p style={{ color: "red" }}>
                    {errors.InquiryFollowupNo.message}
                  </p>
                )}
              </Form.Group>
            </Col>

            <Col md={1} className="d-flex ">
              <Form.Label> Branch ID</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="BranchID"
                {...register("BranchID", {})}
                className="dropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {branchidOptions?.length > 0 ? (
                  branchidOptions.map((branches) => (
                    <option key={branches.id} value={branches.id}>
                      {branches.value || "Unnamed followupmaster"}
                    </option>
                  ))
                ) : (
                  <option disabled>No BranchID options available</option>
                )}
              </select>
              {errors.BranchID && (
                <p className="error-text">Please select a BranchID.</p>
              )}
            </Col>

            <Col md={1} className="d-flex ">
              <Form.Label> OnAcID</Form.Label>
            </Col>
            <Col md={3}>
              <select
                id="OnAcID"
                {...register("OnAcID", {})}
                className="dropdownform"
                style={{ width: "270px" }}
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {onacidOptions?.length > 0 ? (
                  onacidOptions.map((companies) => (
                    <option key={companies.id} value={companies.id}>
                      {companies.value || "Unnamed followupmaster"}
                    </option>
                  ))
                ) : (
                  <option disabled>No OnAcID options available</option>
                )}
              </select>
              {errors.OnAcID && (
                <p className="error-text">Please select a OnAcID.</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> InquiryID</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="InquiryID"
                placeholder="Enter your InquiryID"
                {...register("InquiryID", {})}
                className="inputfieldstyle"
              />
              {errors.InquiryID && (
                <p style={{ color: "red" }}>{errors.InquiryID.message}</p>
              )}
            </Col>
            <Col md={1} className="d-flex ">
              <Form.Label> NextProcess</Form.Label>
            </Col>
            <Col md={5}>
              <select
                id="NextProcess"
                {...register("NextProcess", {})}
                className="dropdownform"
                defaultValue=""
              >
                <option value="" disabled>
                  --Select--
                </option>
                {nextprocessOptions?.length > 0 ? (
                  nextprocessOptions.map((NP) => (
                    <option key={NP.id} value={NP.id}>
                      {NP.id || "Unnamed Next Process"}
                    </option>
                  ))
                ) : (
                  <option disabled>No NextProcess options available</option>
                )}
              </select>
              {errors.nextprocesssError && (
                <p className="error-text">
                  Please select a NextProcess option.
                </p>
              )}
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Followup Remarks</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter FollowupRemarks."
                {...register("FollowupRemarks")}
                className="inputfieldstyle"
              />
              {errors.FollowupRemarks && (
                <p style={{ color: "red" }}>{errors.FollowupRemarks.message}</p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label> Remarks:</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter Remarks."
                {...register("FollowupRemarks")}
                className="inputfieldstyle"
              />
              {errors.Address && (
                <p style={{ color: "red" }}>{errors.Address.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Next Follow-up Date</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="date"
                {...register("NextFollowupDate")}
                className="inputfieldstyle"
                defaultValue={today}
              />
              {errors.NextFollowupDate && (
                <p style={{ color: "red" }}>
                  {errors.NextFollowupDate.message}
                </p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Date</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="date"
                {...register("Date")}
                className="inputfieldstyle"
                defaultValue={today}
              />
              {errors.Date && (
                <p style={{ color: "red" }}>{errors.Date.message}</p>
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
                {...register("Status")}
                className="dropdownform"
                defaultValue=""
              >
                <option value="">--Select--</option>
                {statusOptions?.length > 0 ? (
                  statusOptions.map((status, index) => (
                    <option key={status.id} value={status.id}>
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
                id="entryby"
                {...register("entryby", { required: true })}
                className="dropdownform"
                defaultValue=""
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
              {errors.cuidError && (
                <p className="error-text">Please select a User.</p>
              )}
            </Col>
            <Col md={1} className="d-flex align-items-center">
              <Form.Label>Inquiry Followup No</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Group controlId="InquiryFollowupNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your Inquiry Followup No.."
                  {...register("InquiryFollowupNo", {})}
                  className="inputfieldstyle"
                  disabled
                />
                {errors.InquiryFollowupNo && (
                  <p style={{ color: "red" }}>
                    {errors.InquiryFollowupNo.message}
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </form>

      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/InquiryFollowupMasterTable")}
      />
    </>
  );
}
