import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
import useDropdownData from "../UseDropdownData";
import AxiosInstance from "/src/AxiosInstance";
import UserMasterTable from "../Index/UserMasterTable";

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
  const { data: roleOptions, error: RoleError } = useDropdownData("role");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await AxiosInstance.get(`/UserMaster/${id}`);
          const user = response.data.data;

          if (user) {
            setValue("roleID", user.roleID || "");
            setValue("userName", user.userName || "");
            setValue("password", user.password || "");
            setValue("OldPassword", user.oldPassword || "");
            setValue("Adress", user.Adress || "");
            setValue("mobileNo", user.mobileNo || "");
            setValue("emailID", user.emailID || "");
            setValue("emailPassword", user.emailPassword || "");
            setValue("outsideAccess", user.outsideAccess || "");
            setValue("emailPort", user.emailPort || "");
            setValue("emailHost", user.emailHost || "");
            setValue("emailSSL", user.emailSSL || "");
            setValue("otp", user.otp || "");
            setValue("status", user.status || "");
            setValue("CUID", user.cuid || "");
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
      roleID: id || 0,
      userName: data.userName,
      password: data.password,
      OldPassword: data.OldPassword,
      Adress: data.Adress,
      mobileNo: data.mobileNo,
      emailID: data.emailID,
      emailPassword: data.emailPassword,
      outsideAccess: data.outsideAccess,
      emailPort: data.emailPort,
      emailHost: data.emailHost,
      emailSSL: data.emailSSL,
      otp: data.otp,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      await AxiosInstance.post("/UserMaster", payload);
      alert(id ? "User updated successfully!" : "Successfully submitted data");
      reset();
      navigate("/UserMasterTable");
    } catch (error) {
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

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
  <h1 className="ribbon">User Master Form</h1>
  <Container>
    {/* RoleID DropDown */}
    <Row>
      <Col md={2}>
        <Form.Label>Role:</Form.Label>
      </Col>
      <Col md={10}>
        <Form.Select
          {...register("RoleID", { required: "Role is required" })}
          style={{
            width: "100%",
            padding: "5px",
            border: "2px solid rgb(243, 185, 78)",
            borderRadius: "5px",
          }}
        >
          <option value="">--Select--</option>
          {roleOptions?.length > 0 ? (
            roleOptions.map((role, index) => (
              <option key={role.value} value={role.value}>
                {role.value}
              </option>
            ))
          ) : (
            <option disabled>No role options available</option>
          )}
        </Form.Select>
        {errors.RoleID && <p style={{ color: "red" }}>{errors.RoleID.message}</p>}
      </Col>
    </Row>

    {/* Username */}
    <Row>
      <Col md={2} className="d-flex align-items-center">
        <Form.Label>Username:</Form.Label>
      </Col>
      <Col md={10}>
        <Form.Control
          type="text"
          placeholder="Enter username"
          {...register("UserName", { required: "Username is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.UserName && <p style={{ color: "red" }}>{errors.UserName.message}</p>}
      </Col>
    </Row>
    
    {/* Password and Old Password */}
    <Row>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Password:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="password"
          placeholder="Enter password"
          {...register("Password", { required: "Password is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.Password && <p style={{ color: "red" }}>{errors.Password.message}</p>}
      </Col>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>OldPassword:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="password"
          placeholder="Enter Oldpassword"
          {...register("oldPassword", { required: "OldPassword is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.oldPassword && <p style={{ color: "red" }}>{errors.oldPassword.message}</p>}
      </Col>
    </Row>
    
    {/* Email ID and Email Password */}
    <Row>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Email ID:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("EmailID", { required: "Email is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.EmailID && <p style={{ color: "red" }}>{errors.EmailID.message}</p>}
      </Col>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Email Password:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="password"
          placeholder="Enter Email password"
          {...register("emailPassword", { required: "Email Password is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.emailPassword && <p style={{ color: "red" }}>{errors.emailPassword.message}</p>}
      </Col>
    </Row>
   
    {/* Mobile No and Outside Access */}
    <Row>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Mobile No:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Enter mobile number"
          {...register("MobileNo", { required: "Mobile number is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.MobileNo && <p style={{ color: "red" }}>{errors.MobileNo.message}</p>}
      </Col>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Outside Access:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Check type="checkbox" {...register("OutsideAccess")} />
      </Col>
    </Row>
    
    {/* Email Port and Email Host */}
    <Row>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Email Port:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="number"
          placeholder="Enter Email port"
          {...register("emailPort", { required: "Email port is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.emailPort && <p style={{ color: "red" }}>{errors.emailPort.message}</p>}
      </Col>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Email Host:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Enter Email host"
          {...register("emailHost", { required: "Email host is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.emailHost && <p style={{ color: "red" }}>{errors.emailHost.message}</p>}
      </Col>
    </Row>
    
    {/* Email SSL and OTP */}
    <Row>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Email SSL:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Check type="checkbox" {...register("emailSSL")} />
      </Col>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>OTP:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Enter OTP"
          {...register("otp", { required: "OTP is required" })}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "2px solid rgb(243, 185, 78)",
            borderRadius: "0",
          }}
        />
        {errors.otp && <p style={{ color: "red" }}>{errors.otp.message}</p>}
      </Col>
    </Row>
    
    {/* Status and CUID */}
    <Row>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>Status:</Form.Label>
      </Col>
      <Col md={4}>
        <select
          id="status"
          {...register("status", { required: true })}
          className="form-select"
          style={{
            width: "100%",
          }}
        >
          <option value="">--Select--</option>
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
        {errors.status && <p className="error-text">Please select a status.</p>}
      </Col>
      <Col md={2}className="d-flex align-items-center">
        <Form.Label>CUID:</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Group controlId="CUID">
          <Form.Control
            type="number"
            placeholder="Enter your CUID"
            {...register("CUID", { required: "CUID is required" })}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "2px solid rgb(243, 185, 78)",
              borderRadius: "0",
            }}
          />
          {errors.CUID && <p style={{ color: "red" }}>{errors.CUID.message}</p>}
        </Form.Group>
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
