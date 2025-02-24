import { useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import "../style/style.css";
import React, { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance";
import Footer from "/src/components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import useDropdownData from "../UseDropdownData";

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
   