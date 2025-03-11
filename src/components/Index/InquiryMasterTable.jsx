import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

export default function InquiryMasterTable() {
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
      const response = await AxiosInstance.get("/InquiryMaster");
      setTableData(response.data.data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (inquiryID) => {
    navigate(`/InquiryMasterForm/${inquiryID}`);
  };

  const handleCreateNew = () => {
    navigate("/InquiryMasterForm");
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
        <div className=" shadow-lg table-h1" style={{marginTop:"70px"}}>
          <h5 className="text-center h1label" >Inquiry Master Table</h5>
          <Table striped bordered hover className="alltablestyle">
            <thead className="text-center">
              <tr>
                <th>InquiryNo</th>
                <th>Date</th>
                <th>PartyName</th>
                <th>MobileNo</th>
                <th>EmailID</th>
                <th>Status</th>
                <th>CUID</th>
                <th>MktBy</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((inquiry, index) => (
                <tr
                  key={inquiry.inquiryID || index}
                  onClick={() => handleRowClick(inquiry.inquiryID)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td style={{ width: "4%" }}>{inquiry.inquiryNo}</td>
                  <td style={{ width: "4%" }}>
                    {inquiry.date || inquiry.Date}
                  </td>
                  <td style={{ width: "4%" }}>{inquiry.partyName}</td>
                  <td style={{ width: "4%" }}>
                    {inquiry.mobileNo || inquiry.mobile}
                  </td>
                  <td style={{ width: "4%" }}>{inquiry.emailID}</td>
                  <td style={{ width: "4%" }}>{inquiry.status}</td>
                  <td style={{ width: "4%" }}>{inquiry.userName}</td>

                  <td style={{ width: "4%" }}>{inquiry.mktByName}</td>
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
