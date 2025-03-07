import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button, Alert } from "react-bootstrap";
import "../style/style.css";

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
    <Container className="allcontainer">
      {/* Create New Button */}
      <div className="createbutton">
        <Button onClick={handleCreateNew} variant="success">
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
        <div className="shadow-lg table-h1" style={{ marginTop: "-130px" }}>
          <h5 className="text-center h1label">User Master Table</h5>

          <Table striped bordered hover className="alltablestyle">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Role ID</th>
                <th>Username</th>
                <th>Address</th>
                <th>Mobile No</th>
                <th>Email ID</th>
                <th>Status</th>
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
                  <td style={{ width: "60px" }}>{index + 1}</td>
                  <td style={{ width: "200px" }}>{item.roleID}</td>
                  <td style={{ width: "200px" }}>{item.userName}</td>
                  <td style={{ width: "200px" }}>{item.address}</td>
                  <td style={{ width: "200px" }}>{item.mobileNo}</td>
                  <td style={{ width: "200px" }}>{item.emailID}</td>
                  <td style={{ width: "" }}>{item.statusName}</td>
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
