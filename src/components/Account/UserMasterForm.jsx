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
  const { data: roleOptions, error: roleError } = useDropdownData("role");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await AxiosInstance.get(`/UserMaster/${id}`);
          const user = response.data.data;
          console.log("user", user);

          if (user) {
            setValue("RoleID", user.RoleID || user.roleID || "");
            setValue("UserName", user.UserName || user.userName || "");
            setValue("Password", user.Password || user.password || "");
            setValue("OldPassword", user.OldPassword || user.oldPassword || "");
            setValue("Address", user.Address || user.Address || "");
            setValue("MobileNo", user.MobileNo || user.mobileNo || "");
            setValue("EmailID", user.EmailID || user.emailID || "");
            setValue("EmailPassword", user.EmailPassword || "");
            setValue(
              "OutSideAccess",
              user.OutSideAccess || user.outsideAccess || ""
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
      roleID: id || 0,
      userName: data.userName,
      password: data.password,
      oldPassword: data.oldPassword,
      address: data.address,
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
            <Col md={12}>
              {/* RoleID and UserName in the same column */}
              <Row>
                <Col md={2}>
                  <Form.Label>Role:</Form.Label>
                  <Form.Select
                    {...register("RoleID", { required: "Role is required" })}
                  >
                    <option value="">--Select--</option>
                    {roleOptions?.length > 0 ? (
                      roleOptions.map((role, index) => (
                        <option key={role.value} value={role.value}>
                          {role.value}
                        </option>
                      ))
                    ) : (
                      <option disabled>No status options available</option>
                    )}
                  </Form.Select>
                  {errors.RoleID && (
                    <p style={{ color: "red" }}>{errors.RoleID.message}</p>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    {...register("UserName", {
                      required: "Username is required",
                    })}
                    style={{
                      border: "none",
                      borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                      borderRadius: "0", // Removes rounded corners
                    }}
                  />
                  {errors.UserName && (
                    <p style={{ color: "red" }}>{errors.UserName.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Password */}
          <Row>
            <Col md={2}>
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("Password", { required: "Password is required" })}
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
            <Col md={2}>
              <Form.Label> OldPassword:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="password"
                placeholder="Enter Oldpassword"
                {...register("OldPassword", {
                  required: "OldPassword is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.oldPassword && (
                <p style={{ color: "red" }}>{errors.oldPassword.message}</p>
              )}
            </Col>
          </Row>

          <Col md={2}>
            <Form.Label>Address:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              {...register("Address", { required: "Address is required" })}
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

          {/* Other fields */}

          <Row>
            <Col md={2}>
              <Form.Label>Email ID:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("EmailID", { required: "Email is required" })}
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
            <Col md={2}>
              <Form.Label>Email Password:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="password"
                placeholder="Enter Email password"
                {...register("EmailPassword", {
                  required: "Email Password is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.emailPassword && (
                <p style={{ color: "red" }}>{errors.emailPassword.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Form.Label>Mobile No:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                {...register("MobileNo", {
                  required: "Mobile number is required",
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
            <Col md={2}>
              <Form.Label>Outside Access:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Check type="checkbox" {...register("OutSideAccess")} />
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Form.Label>Email Port:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Enter Email port"
                {...register("EmailPort", {
                  required: "Email port is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.emailport && (
                <p style={{ color: "red" }}>{errors.emailport.message}</p>
              )}
            </Col>
            <Col md={2}>
              <Form.Label>Email Host:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Email host"
                {...register("EmailHost", {
                  required: "emailhost is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.emailhost && (
                <p style={{ color: "red" }}>{errors.emailhost.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Form.Label>Email Ssl:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Check type="checkbox" {...register("EmailSSL")} />
            </Col>
            <Col md={2}>
              <Form.Label>OTP:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                {...register("OTP", {
                  required: "otp is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.otp && (
                <p style={{ color: "red" }}>{errors.otp.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Form.Label>Status:</Form.Label>
            </Col>
            <Col md={2}>
              <select
                id="status"
                {...register("Status", { required: true })}
                className="form-select"
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
              {errors.status && (
                <p className="error-text">Please select a status.</p>
              )}
            </Col>
            <Col md={2}>
              <Form.Label>CUID:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="CUID">
                <Form.Control
                  type="number"
                  placeholder="Enter your CUID"
                  {...register("CUID", { required: "CUID is required" })}
                  style={{
                    border: "none",
                    borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                    borderRadius: "0", // Removes rounded corners
                  }}
                />
                {errors.CUID && (
                  <p style={{ color: "red" }}>{errors.CUID.message}</p>
                )}
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
