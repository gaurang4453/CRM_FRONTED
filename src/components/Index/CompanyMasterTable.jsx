import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import "../style/style.css";

export default function CompanyMasterTable() {
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
      const response = await AxiosInstance.get("/CompanyMaster");
      const data = response.data.data;
      console.log("Fetched Data:", data); // Debugging
      setTableData(data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (companyID) => {
    navigate(`/CompanyMasterForm/${companyID}`);
  };

  const handleCreateNew = () => {
    navigate("/CompanyMasterForm");
  };

  return (
    <div className="app-wrapper"> {/* Add app-wrapper here */}
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
            <h5 className="text-center h1label">Company Master Table</h5>
            <Table striped bordered hover className="alltablestyle">
              <thead className="text-center">
                <tr>
                  <th>Company name</th>
                  <th>ShortCode</th>
                  <th>PANNO</th>
                  <th>GST_No</th>
                  <th>CurrencyCode</th>
                  <th>Address</th>
                  <th>Jurisdiction</th>
                  <th>AuthPerson</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={item.CompanyID || index}
                    onClick={() => handleRowClick(item.companyID)}
                    style={{ cursor: "pointer" }}
                    className="text-center table-row-hover"
                  >
                    <td style={{ width: "10%" }}>{item.companyName}</td>
                    <td style={{ width: "8%" }}>{item.shortCode}</td>
                    <td style={{ width: "10%" }}>{item.panno}</td>
                    <td style={{ width: "8%" }}>{item.gsT_No}</td>
                    <td style={{ width: "8%" }}>
                      {item.currencyCode || item.currencyCode}
                    </td>
                    <td style={{ width: "15%" }}>{item.address}</td>
                    <td style={{ width: "8%" }}>
                      {item.jurisdiction || item.jurisdiction}
                    </td>
                    <td style={{ width: "8%" }}>
                      {item.authPerson || item.authPerson}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          !loading && <p className="text-center text-muted">No data available.</p>
        )}
      </Container>
    </div> //closing app-wrapper
  );
}