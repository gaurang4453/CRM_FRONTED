import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

export default function RoleMasterTable() {
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
      const response = await AxiosInstance.get("/RoleMaster");
      setTableData(response.data.data || response.data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (roleID) => {
    navigate(`/RoleMasterForm/${roleID}`);
  };

  // Navigate to PropMasterForm Page
  const handleCreateNew = () => {
    navigate("/RoleMasterForm"); // Redirects to PropMasterForm
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "100%" }}>
      {/* Create New Button */}
      <div
        className="d-flex justify-content-end mb-3"
        style={{
          position: "fixed", // Fix the button on the screen
          top: "100px", // Adjust the vertical position (distance from the top)
          right: "1320px", // Adjust the horizontal position (distance from the right edge)
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
          style={{
            marginTop: "20px", // Increase the margin-top
            width: "100%", // Set the table container width to 80% of the screen
            height: "450px", // Maintain a fixed height
            marginLeft: "auto", // Center horizontally
            marginRight: "auto", // Center horizontally
          }}
        >
          <h5  className="text-center mb-2"
            style={{
              backgroundColor: "#0d254b",
              color: "white",
              padding: "10px",
              fontWeight: "bold",
            }}>Role Master Table</h5>
          <Table striped bordered hover className="mt-4" style={{ width: "100%" }}>
            <thead className="bg-primary text-white text-center">
              <tr>
                <th style={{ width: "6%" }}>#</th> {/* Adjust width for column 1 */}
                <th style={{ width: "1200px" }}>Role name</th> {/* Adjust width for column 2 */}
                <th style={{ width: "30%" }}>Status</th> {/* Adjust width for column 3 */}
                <th style={{ width: "30%" }}>CUID</th> {/* Adjust width for column 4 */}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={item.roleID || index}
                  onClick={() => handleRowClick(item.roleID)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td>{index + 1}</td>
                  <td>{item.roleName}</td>
                  <td>{item.status}</td>
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