import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import "../style/style.css";

export default function BranchMasterTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchCompanyData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const branchResponse = await AxiosInstance.get("/BranchMaster");
      const branchData = branchResponse.data.data;
      console.log("Fetched Branch Data:", branchData);

      const userResponse = await AxiosInstance.get("/UserMaster");
      const userData = userResponse.data.data;
      console.log("Fetched User Data:", userData);

      const propResponse = await AxiosInstance.get("/PropMaster");
      const propData = propResponse.data.data;
      console.log("Fetched Prop Data:", propData);

      const mergedData = branchData.map((branch) => {
        const user = userData.find((u) => u.CUID === branch.CUID);
        const prop = propData.find((p) => p.PropID === branch.PropID);

        return {
          ...branch,
          userName: user ? user.userName : "N/A",
          propName: prop ? prop.propName : "N/A",
        };
      });

      setTableData(mergedData);
    } catch (error) {
      setError("Something went wrong!");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await AxiosInstance.get("/CompanyMaster");
      setCompanyData(response.data.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
      setError("Failed to fetch company data.");
    }
  };

  const handleRowClick = (branchID) => {
    navigate(`/BranchMasterForm/${branchID}`);
  };

  const handleCreateNew = () => {
    navigate("/BranchMasterForm");
  };

  return (
    <div className="app-wrapper"> {/* Add app-wrapper here */}
      <Container className="allcontainer">
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
            <h5 className="text-center h1label">Branch Master Table</h5>
            <Table striped bordered hover className="alltablestyle">
              <thead className="text-center">
                <tr>
                  <th>Branch name</th>
                  <th>ShortName</th>
                  <th>Company name</th>
                  <th>GST_No</th>
                  <th>UserName</th>
                  <th>PropName</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => {
                  const company = companyData.find(
                    (c) => c.companyID === item.companyID
                  );
                  const companyName = company ? company.companyName : "N/A";

                  return (
                    <tr
                      key={item.branchID || index}
                      onClick={() => handleRowClick(item.branchID)}
                      style={{ cursor: "pointer" }}
                      className="text-center table-row-hover"
                    >
                      <td>{item.branchName}</td>
                      <td>{item.shortName}</td>
                      <td>{companyName}</td>
                      <td>{item.gsT_No}</td>
                      <td>{item.userName}</td>
                      <td>{item.propName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          !loading && <p className="text-center text-muted">No data available.</p>
        )}
      </Container>
    </div> //close app-wrapper
  );
}