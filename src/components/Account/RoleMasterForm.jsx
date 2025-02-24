<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Form } from "react-bootstrap"; // Import Form here
import { useParams, useNavigate } from "react-router-dom";
import "../style/style.css";
import Footer from "/src/components/Footer/Footer";
=======
import { useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import "../style/style.css";
import React, { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance";
import Footer from "/src/components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import useDropdownData from "../UseDropdownData";

>>>>>>> a195959397160b9667bbb60a53ec3c06a8e49f4d
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

<<<<<<< HEAD
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
=======
  const { data: statusOptions, error: statusError } = useDropdownData("status");

  useEffect(() => {
    if (id) {
      const fetchRole = async () => {
        try {
          const response = await AxiosInstance.get(`/RoleMaster/${id}`);
          const role = response.data.data;

          setValue("roleName", role.roleName || "");
          setValue("roleDesc", role.roleDesc || "");
          setValue("status", role.status || "");
          setValue("CUID", role.cuid || "");
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
      roleID: id || 0,
      roleName: data.roleName,
      roleDesc: data.roleDesc,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      if (id) {
        await AxiosInstance.put(`/RoleMaster/${id}`, payload);
      } else {
        await AxiosInstance.post("/RoleMaster", payload);
      }
      navigate("/RoleMasterTable");
    } catch (err) {
      setError("Failed to save role details.");
    }
  };

  return (
   
>>>>>>> a195959397160b9667bbb60a53ec3c06a8e49f4d
