import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import "../style/style.css";

export default function InquiryFollowupMasterTable() {
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
      const response = await AxiosInstance.get("/InquiryFollowupMaster");
      const data = response.data.data;
      console.log("Fetched Data:", data); // Debugging
      setTableData(data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (inquiryFollowupID) => {
    navigate(`/InquiryFollowupMasterForm/${inquiryFollowupID}`);
  };

  const handleCreateNew = () => {
    navigate("/InquiryFollowupMasterForm");
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
        <div className=" shadow-lg table-h1" style={{ marginTop: "-170px" }}>
          <h5 className="text-center h1label">Inquiry Followup Master Table</h5>
          <Table striped bordered hover className="alltablestyle">
            <thead className="text-center">
              <tr>
                <th>InquiryFollowupNo</th>
                <th>Date</th>
                {/* <th>BranchID</th> */}
                {/* <th>OnAcID</th> */}
                <th>InquiryID</th>
                <th>FollowupRemarks</th>
                <th>NextProcess</th>
                <th>NextProcessDate</th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((inquiry, index) => (
                <tr
                  key={inquiry.inquiryID || index}
                  onClick={() => handleRowClick(inquiry.inquiryFollowupID)}
                  style={{ cursor: "pointer" }}
                  className="text-center table-row-hover"
                >
                  <td>{inquiry.inquiryFollowupNo}</td>
                  <td>{inquiry.date || inquiry.Date}</td>
                  <td>{inquiry.inquiryID || inquiry.InquiryID}</td>
                  <td>{inquiry.followupRemarks || inquiry.FollowupRemarks}</td>
                  <td>{inquiry.nextProcess || inquiry.NextProcess}</td>
                  <td>{inquiry.nextFollowupDate || inquiry.NextProcessDate}</td>
                  <td>{inquiry.remarks || inquiry.Remarks}</td>
                  <td>{inquiry.status}</td>
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
