import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

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
      console.log("Fetched Data:", response.data); // Debugging
      setTableData(response.data.data || response.data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = (CompanyID) => {
    navigate(`/CompanyMasterForm/${CompanyID}`);
  };
  // Navigate to PropMasterForm Page
  const handleCreateNew = () => {
    navigate("/CompanyMasterForm"); // Redirects to PropMasterForm
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
          <h3 className="text-center mb-2 text-primary">
            Company Master Table
          </h3>
          <Table bordered hover className="mt-4" style={{ width: "100%" }}>
            <thead className="bg-primary text-white text-center">
              <tr>
                <th style={{ width: "6%" }}>#</th>
                <th style={{ width: "1200px" }}>Company name</th>
                <th style={{ width: "30%" }}>ShortCode</th>
                <th style={{ width: "30%" }}>State</th>
                <th style={{ width: "30%" }}>TINNo</th>
                <th style={{ width: "30%" }}>CST</th>
                <th style={{ width: "30%" }}>PANNO</th>
                <th style={{ width: "30%" }}>ServiceTaxNo</th>
                <th style={{ width: "30%" }}>SSINO</th>
                <th style={{ width: "30%" }}>TANNO</th>
                <th style={{ width: "30%" }}>ECCNo</th>
                <th style={{ width: "30%" }}>Range</th>
                <th style={{ width: "30%" }}>Division</th>
                <th style={{ width: "30%" }}>Commisioner</th>
                <th style={{ width: "30%" }}>GST_No</th>
                <th style={{ width: "30%" }}>CurrencyCode</th>
                <th style={{ width: "30%" }}>Bank</th>
                <th style={{ width: "30%" }}>Description</th>
                <th style={{ width: "30%" }}>TaxDescription</th>
                <th style={{ width: "30%" }}>CertifyDescription</th>
                <th style={{ width: "30%" }}>Declaration</th>
                <th style={{ width: "30%" }}>Jurisdiction</th>
                <th style={{ width: "30%" }}>AuthPerson</th>
                <th style={{ width: "30%" }}>Col1</th>
                <th style={{ width: "30%" }}>Status</th>
                <th style={{ width: "30%" }}>CUID</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={item.CompanyID || index}
                  onClick={() => handleRowClick(item.CompanyID)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td>{index + 1}</td>
                  <td>{item.CompanyName}</td>
                  <td>{item.ShortCode}</td>
                  <td>{item.State}</td>
                  <td>{item.TINNo}</td>
                  <td>{item.CST}</td>
                  <td>{item.PANNO}</td>
                  <td>{item.ServiceTaxNo}</td>
                  <td>{item.SSINO}</td>
                  <td>{item.TANNO}</td>
                  <td>{item.ECCNo}</td>
                  <td>{item.Range}</td>
                  <td>{item.Division}</td>
                  <td>{item.Commisioner}</td>
                  <td>{item.GST_No}</td>
                  <td>{item.CurrencyCode}</td>
                  <td>{item.Address}</td>
                  <td>{item.Bank}</td>
                  <td>{item.Description}</td>
                  <td>{item.TaxDescription}</td>
                  <td>{item.CertifyDescription}</td>
                  <td>{item.Declaration}</td>
                  <td>{item.Jurisdiction}</td>
                  <td>{item.AuthPerson}</td>
                  <td>{item.Col1}</td>
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
