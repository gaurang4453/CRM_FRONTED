import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button, Alert } from "react-bootstrap";

export default function UserMasterTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/UserMaster");
      setTableData(response.data.data || response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (userID) => {
    if (userID) navigate(`/UserMasterForm/${userID}`);
  };

  const handleCreateNew = () => {
    navigate("/UserMasterForm");
  };

  return (
    <Container className="mt-5">
      {/* Create New Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button
          onClick={handleCreateNew}
          variant="success"
          className="px-4 py-2"
        >
          + Create New
        </Button>
      </div>

      {loading && (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && tableData.length > 0 ? (
        <div className="table-responsive shadow-lg rounded bg-white p-3">
          <h3 className="text-center mb-2 text-primary">User Master Table</h3>
          <Table bordered hover className="mt-3">
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>#</th>
                <th>Role ID</th>
                <th>Username</th>
                <th>Address</th>
                <th>Mobile No</th>
                <th>Email ID</th>
                <th>Outside Access</th>
                <th>Email Port</th>
                <th>Email Host</th>
                <th>Email SSL</th>
                <th>OTP</th>
                <th>Status</th>
                <th>CUID</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={item.userID || index}
                  onClick={() => handleRowClick(item.userID)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td>{index + 1}</td>
                  <td>{item.roleID}</td>
                  <td>{item.userName}</td>
                  <td>{item.address}</td>
                  <td>{item.mobileNo}</td>
                  <td>{item.emailID}</td>
                  <td>{item.outsideAccess ? "Yes" : "No"}</td>
                  <td>{item.emailport}</td>
                  <td>{item.emailHost}</td>
                  <td>{item.emailSSL ? "Enabled" : "Disabled"}</td>
                  <td>{item.otp}</td>
                  <td>{item.status}</td>
                  <td>{item.cuid}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        !loading && <p className="text-center text-muted">No data available.</p>
      )}
    </Container>
  );
}
