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
      <div
        className="d-flex justify-content-end mb-3"
        style={{
          position: "fixed", // Fix the button on the screen
          top: "100px", // Adjust the vertical position (distance from the top)
          right: "1335px", // Adjust the horizontal position (distance from the right edge)
          zIndex: "1000", // Ensures it stays above other content
          padding: "5px 10px", // Optional: Adds padding around the button
        }}
      >
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
        <div
          className="table-responsive shadow-lg rounded bg-white p-3"
          style={{
            marginTop: "120px", // Maintain the top margin
            width: "120%", // Increase the table container width (set to 90% for more space)
            height: "500px", // Maintain the height of the container
            marginLeft: "-120px", // Center horizontally
            marginRight: "650px", // Center horizontally
          }}
        >
          <h5
            className="text-center mb-2"
            style={{
              backgroundColor: "#0d254b",
              color: "white",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            User Master Table
          </h5>

          <Table striped bordered hover className="mt-3">
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>#</th>
                <th>Role ID</th>
                <th>Username</th>
                <th>Address</th>
                <th>Mobile No</th>
                <th>Email ID</th>
                {/* <th>Outside Access</th>
                <th>Email Port</th>
                <th>Email Host</th>
                <th>Email SSL</th>
                <th>OTP</th> */}
                <th>Status</th>
                {/* <th>CUID</th> */}
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
                  <td >{index + 1}</td>
                  <td style={{ width: "12%" }}>{item.roleID}</td>
                  <td style={{ width: "15%" }}>{item.userName}</td>
                  <td style={{ width: "25%" }}>{item.address}</td>
                  <td style={{ width: "15%" }}>{item.mobileNo}</td>
                  <td style={{ width: "15%" }}>{item.emailID}</td>
                  <td style={{ width: "14%" }}>{item.status}</td>
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
