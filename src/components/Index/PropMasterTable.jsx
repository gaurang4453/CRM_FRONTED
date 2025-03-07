import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import "../style/style.css";

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
      setLoading(false);
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

      {error && <p className="text-danger text-center">{error}</p>}

      {tableData.length > 0 && !loading ? (
        <div className="shadow-lg table-h1">
          <h5 className="text-center h1label">Property Master Table</h5>
          <Table striped bordered hover className="alltablestyle">
            <thead className="text-center">
              <tr>
                <th style={{ width: "200px" }}>#</th>
                <th style={{ width: "1000px" }}>Property Type Name</th>
                <th style={{ width: "1200px" }}>Property Name</th>
                <th style={{ width: "1200px" }}>Property Value</th>
                <th style={{ width: "1000px" }}>Status</th>
                <th style={{ width: "800px" }}>CUID</th>
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
