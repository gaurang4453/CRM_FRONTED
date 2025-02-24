import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

function PropMasterTable() {
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
      const response = await AxiosInstance.get("/PropMaster");
      setTableData(response.data.data || response.data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false)
    }
  };

  // Navigate to Edit Page when clicking on a row
  const handleRowClick = (propID) => {
    navigate(`/PropMasterForm/${propID}`);
  };

  // Navigate to PropMasterForm Page
  const handleCreateNew = () => {
    navigate("/PropMasterForm"); // Redirects to PropMasterForm
  };

  return (
    <Container className="mt-5">
      {/* Create New Button */}
      <div
        className="d-flex justify-content-end mb-3"
        style={{
          position: "left", // Fix the button on the screen
          top: "90px", // Adjust the vertical position (distance from the top)
          right: "1300px", // Adjust the horizontal position (distance from the right edge)
          zIndex: "1000", // Ensures it stays above other content
          padding: "5px 10px", // Optional: Adds padding around the button
        }}
      >
        <Button onClick={handleCreateNew} variant="success" className="px-7 py-2">
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
        <div className="table-responsive shadow-lg rounded bg-white p-3" style={{ marginTop: '130px', width: '150%'}}> {/* Increase the margin-top */}
          <h3 className="text-center mb-2 text-primary">Property Master Table</h3>
          <Table bordered hover className="mt-3">
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>#</th>
                <th>Property Type Name</th>
                <th>Property Name</th>
                <th>Property Value</th>
                <th>Status</th>
                <th>CUID</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={item.propID || index}
                  onClick={() => handleRowClick(item.propID)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td>{index + 1}</td>
                  <td>{item.propTypeName}</td>
                  <td>{item.propName}</td>
                  <td>{item.propValue}</td>
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

export default PropMasterTable;
