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
      const data = response.data.data;
      //console.log("Fetched Data:", data); // Debugging
      setTableData(data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = (InquiryID) => {
    navigate(`/InquiryMasterForm/${InquiryID}`);
  };

  const handleCreateNew = () => {
    navigate("/InquiryMasterForm");
  };

  const style = {
    overflowX: "scroll",
    width: "2000px", // Increased width of the table
  };

 
  return (
    <Container className="mt-5" style={{ maxWidth: "100%" }}>
      {/* Create New Button */}
      <div
        className="d-flex justify-content-end mb-3"
        style={{
          position: "fixed", // Fix the button on the screen
          top: "100px", // Adjust the vertical position (distance from the top)
          right: "1285px", // Adjust the horizontal position (distance from the right edge)
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
        <div className="   p-3 table">
          <h5
            className="text-center mb-2"
            style={{
              backgroundColor: "#0d254b",
              color: "white",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Inquiry Master Table
          </h5>
          <Table
            striped
            bordered
            hover
            
            className="mt-4 alltable"
          >
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>InquiryNo</th>
                <th>Date</th>
                <th>PartyName</th>
                <th>MobileNo</th>
                <th>EmailID</th>
                <th>VoucherType</th>
                <th>Status</th>
                <th>CUID</th>
                <th>MktBy</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((inquiry, index) => (
                <tr
                  key={inquiry.inquiryid || index}
                  onClick={() => handleRowClick(inquiry.inquiryid)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  {" "}
                  <td style={{ width: "5%" }}>{inquiry.inquiryNo}</td>
                  <td style={{ width: "4%" }}>{inquiry.date}</td>
                  <td style={{ width: "4%" }}>{inquiry.partyName}</td>
                  <td style={{ width: "4%" }}>{inquiry.mobileNo}</td>
                  <td style={{ width: "4%" }}>{inquiry.emailID}</td>
                  <td style={{ width: "4%" }}>{inquiry.voucherType}</td>
                  <td style={{ width: "4%" }}>{inquiry.status}</td>
                  <td style={{ width: "4%" }}>{inquiry.cUID}</td>
                  <td style={{ width: "4%" }}>{inquiry.mktBy}</td>
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
