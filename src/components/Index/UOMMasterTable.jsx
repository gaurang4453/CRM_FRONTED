import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import "../style/style.css";

export default function UOMMasterTable() {
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
      const response = await AxiosInstance.get("/UOMMaster");
      const data = response.data.data;
      console.log("Fetched Data:", data); // Debugging
      setTableData(data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = (UOMID) => {
    navigate(`/UOMMasterForm/${UOMID}`);
  };

  const handleCreateNew = () => {
    navigate("/UOMMasterForm");
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
        <div className=" shadow-lg table-h1">
          <h5 className="text-center  h1label">UOM Master Table</h5>
          <Table striped bordered hover className="alltablestyle">
            <thead className="text-center">
              <tr>
                <th style={{ width: "140px" }}>UOM</th>{" "}
                <th style={{ width: "140px" }}>CF</th>{" "}
                <th style={{ width: "140px" }}>Status</th>{" "}
                <th style={{ width: "140px" }}>CUID</th>{" "}
              </tr>
            </thead>
            <tbody>
              {tableData.map((uom, index) => (
                <tr
                  key={uom.uomid || index}
                  onClick={() => handleRowClick(uom.uomid)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td >{uom.uOM || uom.uom}</td>
                  <td >{uom.cF || uom.cf}</td>
                  <td >{uom.status || uom.status}</td>
                  <td >{uom.cUID || uom.cuid}</td>
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
