import React from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../AxiosInstance";
import { Row, Col, Container } from "react-bootstrap";
import "/src/style/style.css";
import { useNavigate } from "react-router-dom";

export default function PropMasterForm() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  // const navigate = useNavigate(); // Initialize useNavigate
  // // Function to submit form data
  // const handleFormSubmit = async (data) => {
  //   console.log("Submitting the form:", data);
  //   const payload = {
  //     propID: 0,
  //     propTypeName: data.propTypeName,
  //     propName: data.propName,
  //     propValue: data.propValue,
  //     status: data.status,
  //     CUID: data.CUID,
  //   };
  //   try {
  //     const response = await AxiosInstance.post("/PropMaster", payload);
  //     console.log("Successfully submitted data:", response);
  //     alert("Successfully submitted data");
  //     reset(); // Reset form after submission
  //     navigate("/PropMasterTable"); // Redirect after submission
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error submitting data");
  //   }
  // };
  // return (
  //   <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
  //     <h1 className="ribbon">Prop Master Form</h1>
  //     <Container>
  //       {/* Property Type Name */}
  //       <Row className="mb-3">
  //         <Col md={3} className="d-flex align-items-center">
  //           <label>Property Type Name: </label>
  //         </Col>
  //         <Col md={9}>
  //           <input {...register("propTypeName")} className="line-textbox" />
  //         </Col>
  //       </Row>
  //       {/* Property Name */}
  //       <Row className="mb-3">
  //         <Col md={3} className="d-flex align-items-center">
  //           <label>Property Name: </label>
  //         </Col>
  //         <Col md={9}>
  //           <input {...register("propName")} className="line-textbox" />
  //         </Col>
  //       </Row>
  //       {/* Property Value */}
  //       <Row className="mb-3">
  //         <Col md={3} className="d-flex align-items-center">
  //           <label>Property Value: </label>
  //         </Col>
  //         <Col md={9}>
  //           <input {...register("propValue")} className="line-textbox" />
  //         </Col>
  //       </Row>
  //       {/* Status Dropdown */}
  //       <Row className="mb-3">
  //         <Col md={3} className="d-flex align-items-center">
  //           <label>Status: </label>
  //         </Col>
  //         <Col md={9}>
  //           <select {...register("status")} className="form-select">
  //             <option value="" disabled selected>
  //               --Select--
  //             </option>
  //             <option value="Active">Active</option>
  //             <option value="Deactive">Deactive</option>
  //           </select>
  //         </Col>
  //       </Row>
  //       {/* CUID */}
  //       <Row className="mb-3">
  //         <Col md={3} className="d-flex align-items-center">
  //           <label>CUID: </label>
  //         </Col>
  //         <Col md={9}>
  //           <input
  //             {...register("CUID", {
  //               pattern: {
  //                 value: /^[0-9]+$/, // Allow only numbers
  //                 message: "CUID must be a number.",
  //               },
  //             })}
  //             placeholder="Enter in numbers only."
  //             className="line-textbox"
  //           />
  //           {errors.CUID && (
  //             <p style={{ color: "red" }}>{errors.CUID.message}</p>
  //           )}
  //         </Col>
  //       </Row>
  //       {/* Submit Button */}
  //       <div className="submit-container">
  //         <input type="submit" value="Submit" />
  //       </div>
  //     </Container>
  //   </form>
  // );
}
//aa
