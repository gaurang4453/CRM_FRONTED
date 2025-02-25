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
        roleName: data.roleName,
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
  
