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
  const { data: roleOptions, error: roleError } = useDropdownData("role");
  const { data: cuidOptions, error: cuidError } = useDropdownData("entryby");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await AxiosInstance.get(`/UserMaster/${id}`);
          const user = response.data.data;
          console.log("user", user);

          if (user) {
            setValue("RoleID", user.roleID || "");
            setValue("UserName", user.UserName || user.userName || "");
            setValue("Password", user.Password || user.password || "");
            setValue("OldPassword", user.OldPassword || user.oldPassword || "");
            setValue("Address", user.Address || user.address || "");
            setValue("MobileNo", user.MobileNo || user.mobileNo || "");
            setValue("EmailID", user.EmailID || user.emailID || "");
            setValue("EmailPassword", user.emailPassword || "");
            setValue(
              "OutSideAccess",
              user.OutSideAccess || user.outSideAccess || ""
            );
            setValue("EmailPort", user.EmailPort || user.emailPort || "");
            setValue("EmailHost", user.EmailHost || user.emailHost || "");
            setValue("EmailSSL", user.EmailSSL || user.emailSSL || "");
            setValue("OTP", user.OTP || user.otp || "");
            setValue("Status", user.Status || user.status || "");
            setValue("CUID", user.CUID || user.cuid || "");
          } else {
            console.warn("No data found for roleID:", id);
          }
        } catch (err) {
          setError("Failed to fetch role details.");
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
      userID: id || 0,
      RoleID: data.RoleID || 0,
      UserName: data.UserName,
      Password: data.Password,
      OldPassword: data.OldPassword,
      Address: data.Address,
      MobileNo: data.MobileNo,
      EmailID: data.EmailID,
      EmailPassword: data.EmailPassword,
      OutSideAccess: data.OutSideAccess,
      EmailPort: data.EmailPort,
      EmailHost: data.EmailHost,
      EmailSSL: data.EmailSSL,
      OTP: data.OTP,
      Status: data.Status,

      CUID: parseInt(data.CUID, 10) || 0,
    };

    try {
      const response = await AxiosInstance.post("/UserMaster", payload);
      console.log("API Response:", response.data); // Log API response
      alert(id ? "User updated successfully!" : "Successfully submitted data");
      reset();
      navigate("/UserMasterTable");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message); // Log error response
      alert("Error submitting data");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      try {
        await AxiosInstance.delete(`/UserMaster/${id}`);
        alert("User deleted successfully!");
        navigate("/UserMasterTable");
      } catch (error) {
        alert("Failed to delete User");
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
        <h1 className="ribbon">{id ? "Edit Property" : "User Master Form"}</h1>{" "}
        <Container>
          {/* RoleID DropDown */}
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Role:</Form.Label>
            </Col>
            <Col md={10}>
              <Form.Select
                {...register("RoleID", { required: "Role is required." })}
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "2px solid rgb(243, 185, 78)",
                  borderRadius: "5px",
                }}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {roleOptions?.length > 0 ? (
                  roleOptions.map((role) => (
                    <option key={role.value} value={role.id}>
                      {role.value}{" "}
                      {/* Displaying the role name instead of ID */}
                    </option>
                  ))
                ) : (
                  <option disabled>No role options available</option>
                )}
              </Form.Select>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>UserName:</Form.Label>
            </Col>
            <Col md={10}>
              <Form.Control
                {...register("UserName", { required: "UserName is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              ></Form.Control>
              {errors.RoleID && (
                <p style={{ color: "red" }}>{errors.RoleID.message}</p>
              )}
            </Col>
          </Row>
          <br />
          {/* Password */}
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("Password", { required: "Password is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.Password && (
                <p style={{ color: "red" }}>{errors.Password.message}</p>
              )}
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label> OldPassword:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="password"
                placeholder="Enter Oldpassword"
                {...register("OldPassword")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.oldPassword && (
                <p style={{ color: "red" }}>{errors.oldPassword.message}</p>
              )}
            </Col>
          </Row>
          <br />
          {/* Other fields */}

          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Email ID:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("EmailID", { required: "Email is required." })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.EmailID && (
                <p style={{ color: "red" }}>{errors.EmailID.message}</p>
              )}
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Email Password:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="password"
                placeholder="Enter Email password"
                {...register("EmailPassword")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.EmailPassword && (
                <p style={{ color: "red" }}>{errors.EmailPassword.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Mobile No:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                {...register("MobileNo", {
                  required: "Mobile number is required.",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.MobileNo && (
                <p style={{ color: "red" }}>{errors.MobileNo.message}</p>
              )}
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Outside Access:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Check type="checkbox" {...register("OutSideAccess")} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Address:</Form.Label>
            </Col>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                {...register("Address")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
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
              <Form.Label>Email Port:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Enter Email port"
                {...register("EmailPort")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.emailport && (
                <p style={{ color: "red" }}>{errors.emailport.message}</p>
              )}
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Email Host:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Email host"
                {...register("EmailHost")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.emailhost && (
                <p style={{ color: "red" }}>{errors.emailhost.message}</p>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Email Ssl:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Check type="checkbox" {...register("EmailSSL")} />
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>OTP:</Form.Label>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                {...register("OTP")}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(133, 132, 130)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.otp && (
                <p style={{ color: "red" }}>{errors.otp.message}</p>
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
                {...register("Status")}
                className="form-select"
                defaultValue=""
                style={{
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  border: "2px solid rgb(133, 132, 130)",
                  fontSize: "14px",
                  width: "360px",
                }}
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
                  height: "30px", // Decrease the height
                  padding: "0.2rem", // Reduce padding
                  border: "2px solid rgb(133, 132, 130)",
                  fontSize: "14px",
                  width: "360px",
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
        onCancel={() => navigate("/UserMasterTable")}
      />
    </>
  );
}
