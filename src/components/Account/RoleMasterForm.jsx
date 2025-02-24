import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap"; // Import Form here
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
export default function RoleMasterForm() {
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

  // Handle submit logic
  const onSubmit = (data) => {
    console.log(data);
    // Perform save or API call here
  };

  // Handle delete logic (if applicable)
  const handleDelete = () => {
    console.log("Deleted", id);
    // Perform delete action here
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Role Master Form</h1>
        <Container>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formRoleName">
                <Form.Label>Role Name : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your role name"
                  {...register("roleName", { required: "Role name is required" })}
                />
                {errors.roleName && (
                  <p style={{ color: "red" }}>{errors.roleName.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>

        
      </Form>

      {/* Assuming Footer is a custom component */}
      <Footer className="footer" onSave={handleSubmit(onSubmit)} onDelete={id ? handleDelete : undefined} onCancel={() => navigate("/PropMasterTable")} />
    </>
  );
}
