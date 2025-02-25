import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

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
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = (roleID) => {
    navigate(`/UserMasterForm/${roleID}`);
  };

  // Navigate to PropMasterForm Page
  const handleCreateNew = () => {
    navigate("/UserMasterForm"); // Redirects to PropMasterForm
  };
  return (
    <Container className="mt-5">
      {/* Create New Button */}
      <div
        className="d-flex justify-content-end mb-3"
        style={{
          position: "fixed", // Fix the button on the screen
          top: "100px", // Adjust the vertical position (distance from the top)
          right: "1275px", // Adjust the horizontal position (distance from the right edge)
          zIndex: "1000", // Ensures it stays above other content
          padding: "5px 10px", // Optional: Adds padding around the button
        }}
      >
        <Button
          onClick={handleCreateNew}
          variant="success"
          className="px-7 py-2"
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

      {error && <p className="text-danger text-center">{error}</p>}

      {tableData.length > 0 && !loading ? (
        <div
          className="table-responsive shadow-lg rounded bg-white p-3"
          style={{ marginTop: "130px" }}
        >
          {" "}
          {/* Increase the margin-top */}
          <h3 className="text-center mb-2 text-primary">User Master Table</h3>
          <Table bordered hover className="mt-3">
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>#</th>
                <th>RoleID</th>
                <th>UserName</th>
                <th>Password</th>
                <th>OldPassword</th>
                <th>Adress</th>
                <th>MobileNo</th>
                <th>EmailID</th>
                <th>EmailPassword</th>
                <th>OutsideAccess</th>
                <th>Emailport</th>
                <th>EmailHost</th>
                <th>EmailSSL</th>
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
                  <td>{item.RoleID || item.roleID}</td>
                  <td>{item.UserName || item.userName}</td>
                  <td>{item.Password || item.password}</td>
                  <td>{item.OldPassword || item.oldPassword}</td>
                  <td>{item.Adress || item.adress}</td>
                  <td>{item.MobileNo || item.mobileNo}</td>
                  <td>{item.EmailID || item.emailID}</td>
                  <td>{item.EmailPassword || item.emailPassword}</td>
                  <td>{item.OutsideAccess || item.outsideAccess}</td>
                  <td>{item.Emailport || item.emailport}</td>
                  <td>{item.EmailHost || item.emailHost}</td>
                  <td>{item.EmailSSL || item.emailSSL}</td>
                  <td>{item.OTP || item.otp}</td>
                  <td>{item.status || item.Status}</td>
                  <td>{item.CUID || item.cuid}</td>
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
