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

  useEffect(() => {
    if (id) {
      const fetchRole = async () => {
        try {
          const response = await AxiosInstance.get(`/CompanyMaster/${id}`);
          const company = response.data.data;

          if (company) {
            setValue("CompanyName", company.CompanyName || "");
            setValue("ShortCode", company.ShortCode || "");
            setValue("State", company.State || "");
            setValue("TINNo", company.TINNo || "");
            setValue("CST", company.CST || "");
            setValue("PANNO", company.PANNO || "");
            setValue("ServiceTaxNo", company.ServiceTaxNo || "");
            setValue("SSINO", company.SSINO || "");
            setValue("TANNO", company.TANNO || "");
            setValue("ECCNo", company.ECCNo || "");
            setValue("Range", company.Range || "");
            setValue("Division", company.Division || "");
            setValue("Commisioner", company.Commisioner || "");
            setValue("GST_No", company.GST_No || "");
            setValue("CurrencyCode", company.CurrencyCode || "");
            setValue("Address", company.Address || "");
            setValue("Bank", company.Bank || "");
            setValue("Description", company.Description || "");
            setValue("TaxDescription", company.TaxDescription || "");
            setValue("CertifyDescription", company.CertifyDescription || "");
            setValue("Declaration", company.Declaration || "");
            setValue("Jurisdiction", company.Jurisdiction || "");
            setValue("AuthPerson", company.AuthPerson || "");
            setValue("Col1", company.Col1 || "");
            setValue("status", company.status || "");
            setValue("CUID", company.cuid || "");
          } else {
            console.warn("No data found for companyID:", id);
          }
        } catch (err) {
          setError("Failed to fetch role details.");
        } finally {
          setLoading(false);
        }
      };
      fetchRole();
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
      await AxiosInstance.post("/RoleMaster", payload);
      alert(id ? "Role updated successfully!" : "Successfully submitted data");
      reset();
      navigate("/RoleMasterTable");
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
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="ribbon" style={{ marginBottom: "30px" }}>
          Company Master Form
        </h1>
        <Container>

          <Row style={{ marginBottom: "15px" }}>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>Company Name:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="roleName">
                <Form.Control
                  type="text"
                  placeholder="Enter your role name"
                  {...register("CompanyName", {
                    required: "Company name is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.CompanyName && (
                  <p style={{ color: "red" }}>{errors.CompanyName.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> TINNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="TINNo"
                placeholder="Enter TINNo"
                {...register("TINNo", {
                  required: "TINNo is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.TINNo && (
                <p style={{ color: "red" }}>{errors.TINNo.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>TINDT:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="TINDT">
                <Form.Control
                  type="text"
                  placeholder="Enter your TINDT"
                  {...register("TINDT", {
                    required: "TINDT is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.TINDT && (
                  <p style={{ color: "red" }}>{errors.TINDT``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> CST:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="CST"
                placeholder="Enter CST"
                {...register("CST", {
                  required: "CST is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.CST && (
                <p style={{ color: "red" }}>{errors.CST.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>CSTDT:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="CSTDT">
                <Form.Control
                  type="text"
                  placeholder="Enter your CSTDT"
                  {...register("CSTDT", {
                    required: "CSTDT is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.CSTDT && (
                  <p style={{ color: "red" }}>{errors.CSTDT``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> PANNO:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="PANNO"
                placeholder="Enter PANNO"
                {...register("PANNO", {
                  required: "PANNO is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.PANNO && (
                <p style={{ color: "red" }}>{errors.PANNO.message}</p>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>ServiceTaxNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="ServiceTaxNo">
                <Form.Control
                  type="text"
                  placeholder="Enter your ServiceTaxNo"
                  {...register("ServiceTaxNo", {
                    required: "ServiceTaxNo is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.ServiceTaxNo && (
                  <p style={{ color: "red" }}>{errors.ServiceTaxNo``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> SSINO:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="SSINO"
                placeholder="Enter SSINO"
                {...register("SSINO", {
                  required: "SSINO is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.SSINO && (
                <p style={{ color: "red" }}>{errors.SSINO.message}</p>
              )}
            </Col>
          </Row>



          <Row>
            <Col md={2} className="d-flex align-items-center">
              <Form.Label>TANNO:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="TANNO">
                <Form.Control
                  type="text"
                  placeholder="Enter your TANNO"
                  {...register("TANNO", {
                    required: "TANNO is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.TANNO && (
                  <p style={{ color: "red" }}>{errors.TANNO``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ECCNo:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ECCNo"
                placeholder="Enter ECCNo"
                {...register("ECCNo", {
                  required: "ECCNo is required",
                })}
                style={{
                  border: "none",
                  borderBottom: "2px solid rgb(243, 185, 78)", // Yellow underline using rgb(243, 185, 78)
                  borderRadius: "0", // Removes rounded corners
                }}
              />
              {errors.ECCNo && (
                <p style={{ color: "red" }}>{errors.ECCNo.message}</p>
              )}
            </Col>
          </Row>


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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
                    required: "State is required",
                  })}
                  style={{
                    border: "none", // Removes the border
                    borderBottom: "2px solid rgb(243, 185, 78)", // Adds a bottom border with new color
                    outline: "none", // Removes the outline when focused
                    boxShadow: "none", // Removes the shadow on focus
                    padding: "5px 0", // Adds padding to the top and bottom for better appearance
                    width: "80%", // Decreases the width of the input box
                  }}
                />
                {errors.State && (
                  <p style={{ color: "red" }}>{errors.State``.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label> ShortCode:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type="ShortCode"
                placeholder="Enter ShortCode"
                {...register("ShortCode", {
                  required: "ShortCode is required",
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
