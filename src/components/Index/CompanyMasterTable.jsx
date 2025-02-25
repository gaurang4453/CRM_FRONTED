import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

// export default function CompanyMasterTable() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await AxiosInstance.get("/CompanyMaster");
//       setTableData(response.data.data || response.data);
//     } catch (error) {
//       setError("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleRowClick = (roleID) => {
//     navigate(`/CompanyMasterForm/${roleID}`);
//   };

//   // Navigate to PropMasterForm Page
//   const handleCreateNew = () => {
//     navigate("/CompanyMasterForm"); // Redirects to PropMasterForm
//   };