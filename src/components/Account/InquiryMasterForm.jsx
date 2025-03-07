import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";
import Footer from "/src/components/Footer/Footer";
import "../style/style.css";

const SubTableInquiryMaster = ({ id, initialRows = [], onRowsUpdate }) => {
  const [rows, setRows] = useState(
    initialRows.length > 0
      ? initialRows
      : [
          {
            id: 1,
            SeqNo: "",
            itemName: "",
            description: "",
            uomid: "",
            qty: 1, // Ensure qty is never 0
            remarks: "",
          },
        ]
  );

  const { data: itemsOptions, error: itemsError } = useDropdownData("items");

  useEffect(() => {
    onRowsUpdate(rows);
  }, [rows, onRowsUpdate]);

  useEffect(() => {
    if (initialRows.length > 0) {
      setRows(initialRows);
    }
  }, [initialRows]);

  const addRow = () => {
    const newRow = {
      ItemID: rows.length + 1,
      itemName: "",
      description: "",
      uomid: "",
      qty: 1, // Ensure valid qty
      remarks: "",
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    onRowsUpdate(updatedRows);
  };

  const removeRow = (rowId) => {
    const updatedRows = rows
      .filter((row) => row.id !== rowId)
      .map((row, index) => ({
        ...row,
        id: index + 1, // Reorder IDs correctly
      }));
    setRows(updatedRows);
    onRowsUpdate(updatedRows);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
    onRowsUpdate(updatedRows);
  };

  if (itemsError) {
    console.error("Error fetching items:", itemsError);
  }

  return (
    <div className="container-fluid mt-4">
      <h5
        className="text-center mb-2"
        style={{
          backgroundColor: "#0d254b",
          color: "white",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Item Master Table
      </h5>
      <div className="table-responsive">
        <table
          className="table table-bordered w-100"
          style={{ minWidth: "85vw", marginLeft: "-10px" }}
        >
          <thead className="bg-dark text-white text-center">
            <tr>
              <th>SeqNo</th>
              <th>Item Name / Description</th>
              <th>UOM / Qty</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="text-center">{row.id}</td>
                <td>
                  <select
                    className="form-select"
                    value={row.itemName}
                    onChange={(e) =>
                      updateRow(index, "itemName", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      --Select--
                    </option>
                    {itemsOptions?.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="form-control mt-2"
                    placeholder="Description"
                    value={row.description}
                    onChange={(e) =>
                      updateRow(index, "description", e.target.value)
                    }
                  ></textarea>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UOM"
                    value={row.uomid}
                    onChange={(e) => updateRow(index, "uomid", e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Qty"
                    value={row.qty}
                    min="1"
                    onChange={(e) =>
                      updateRow(
                        index,
                        "qty",
                        Math.max(1, parseInt(e.target.value, 10) || 1)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Remarks"
                    value={row.remarks}
                    onChange={(e) =>
                      updateRow(index, "remarks", e.target.value)
                    }
                  />
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={addRow}
                  >
                    <FaPlus />
                  </button>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeRow(row.id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InquiryMasterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState({});
  const [inquiryItemRows, setInquiryItemRows] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  // Fetch dropdown data
  const { data: statusOptions, error: statusError } = useDropdownData("status");
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");
  const { data: branchesOptions, error: branchesError } =
    useDropdownData("branches");
  const { data: companiesOptions, error: companiesError } =
    useDropdownData("companies");

  const handleItemRowsUpdate = (updatedRows) => {
    setInquiryItemRows(updatedRows);
  };

  useEffect(() => {
    if (id && id !== "undefined") {
      const fetchInquiryMaster = async () => {
        try {
          const response = await AxiosInstance.get(`/InquiryMaster/${id}`);
          const data = response.data.data;

          const fieldsToSet = [
            "InquiryNo",
            "Date",
            "BranchID",
            "CompanyID",
            "ReferenceBy",
            "PartyName",
            "Address",
            "Area",
            "State",
            "ContactName",
            "Mobile",
            "Mobile2",
            "EmailID",
            "EmailID2",
            "Remarks",
            "Currency",
            "CF",
            "SendMail",
            "Status",
            "MktBy",
            "Auth",
            "AuthBy",
            "CUID",
          ];

          fieldsToSet.forEach((field) => {
            let value = data[field.charAt(0).toLowerCase() + field.slice(1)];

            if (field === "Date" && value) {
              value = value.split("T")[0];
            }

            if (field === "SendMail" || field === "Auth") {
              value = !!value;
            }

            if (value !== undefined && value !== null) {
              setValue(field, value);
            }
          });

          if (data.inquiryItemList && data.inquiryItemList.length > 0) {
            const rowsData = data.inquiryItemList.map((item) => ({
              itemid: item.itemid || item.inquiryItemID,
              seqNo: item.seqNo || item.SeqNo,
              itemName: item.itemID || "",
              description: item.description || item.Description,
              uomid: item.uomid || item.UOMID,
              qty: item.qty || 0,
              remarks: item.remark || item.Remark,
            }));
            console.log("Updated inquiry item rows:", rowsData);
            setInquiryItemRows([...rowsData]);
          }
          console.log("Payload being sent:", payload);
        } catch (err) {
          console.error("Failed to fetch InquiryMaster details:", err);
          setError("Failed to fetch InquiryMaster details.");
        } finally {
          setLoading(false);
        }
      };
      fetchInquiryMaster();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Log form data
    const formValues = getValues();

    const payload = {
      inquiryID: id ? parseInt(id, 10) : 0,
      inquiryNo: formValues.InquiryNo || "",
      date: formValues.Date
        ? new Date(formValues.Date).toISOString()
        : new Date().toISOString(),
      branchID: parseInt(formValues.BranchID, 10) || 0,
      companyID: parseInt(formValues.CompanyID, 10) || 0,
      referenceBy: formValues.ReferenceBy || "",
      partyName: formValues.PartyName || "",
      address: formValues.Address || "",
      area: formValues.Area || "",
      state: formValues.State || "",
      contactName: formValues.ContactName || "",
      mobile: formValues.Mobile || "",
      mobile2: formValues.Mobile2 || "",
      emailID: formValues.EmailID || "",
      emailID2: formValues.EmailID2 || "",
      remarks: formValues.Remarks || "",
      currency: formValues.Currency || "",
      cf: parseFloat(formValues.cf) || parseFloat(formValues.CF),
      sendMail: !!formValues.SendMail,
      status: formValues.Status || "",
      mktBy: parseInt(formValues.MktBy, 10) || 0,
      auth: !!formValues.Auth,
      authBy: parseInt(formValues.AuthBy, 10) || 0,
      cuid: parseInt(formValues.cuid, 10) || 0,

      inquiryItemList: inquiryItemRows.map((row) => ({
        itemid: row.itemid || row.inquiryItemID,
        seqNo: row.seqNo || row.seqNo,
        itemName: row.itemID || "N/A", // Prevent empty string rejection
        description: row.description || "N/A",
        uomid: row.uomid || 1, // Ensure it's not empty
        qty: row.qty > 0 ? row.qty : 1, // Ensure a valid quantity
        remark: row.remarks || row.Remarks,
      })),
    };

    console.log(
      "Final payload before submission:",
      JSON.stringify(payload, null, 2)
    );

    try {
      const response = await AxiosInstance.post("/InquiryMaster", payload);
      console.log("API Response:", response.data);
      alert(
        id ? "Inquiry updated successfully!" : "Successfully submitted data"
      );
      reset();
      navigate("/InquiryMasterTable");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
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
        console.error(error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

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
                  {...register("Date", { required: "Date is required." })}
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
                {...register("cf", { required: "CF is required." })}
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
        <SubTableInquiryMaster
          id={id}
          initialRows={inquiryItemRows}
          onRowsUpdate={handleItemRowsUpdate}
        />
      </Form>
      <Footer
        className="footer"
        onSave={handleSubmit(onSubmit)}
        onDelete={id ? handleDelete : undefined}
        onCancel={() => navigate("/InquiryMasterTable")}
      />
    </>
  );
};

export default InquiryMasterForm;
