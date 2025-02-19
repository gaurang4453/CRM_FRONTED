import React from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../AxiosInstance";
import { Row, Col, Container } from "react-bootstrap"; // Importing Bootstrap components
import "/src/style/style.css"; // Ensure this file exists and has no errors

function PropMasterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to submit form data
  const handleFormSubmit = async (data) => {
    console.log("Submitting the form:", data);
    const payload = {
      propID: 0,
      propTypeName: data.propTypeName,
      propName: data.propName,
      propValue: data.propValue,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      const response = await AxiosInstance.post("/PropMaster", payload);
      console.log("Successfully submitted data:", response);
      alert("Successfully submitted data");
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
    }
  };

  return (
    <Container>
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
      <h1>Property Master Form</h1>

      <div className="form-field">
        <label>Property Type Name : </label>
        <input {...register("propTypeName")} />
      </div>

        {/* Property Value */}
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Property Value: </label>
          </Col>
          <Col md={9}>
            <input {...register("propValue")} className="line-textbox" />
          </Col>
        </Row>

        {/* Status Dropdown */}
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>Status: </label>
          </Col>
          <Col md={9}>
            <select id="status" name="status" className="form-select">
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </Col>
        </Row>

        {/* CUID */}
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>CUID: </label>
          </Col>
          <Col md={9}>
            <input 
              {...register("CUID", {
                // required: "CUID is required", 
                pattern: {
                  value: /^[0-9]+$/,  // Regex to allow only numbers
                  message: "CUID must be a number.",
                }
              })} 
              placeholder="Enter in numbers only." 
              className="line-textbox" 
            />
            {/* Display error message if CUID is not a number */}
            {errors.CUID && <p style={{ color: 'red' }}>{errors.CUID.message}</p>}
          </Col>
        </Row>

        {/* Submit Button */}
        <div className="submit-container">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </Container>
  );
}

export default PropMasterForm;
