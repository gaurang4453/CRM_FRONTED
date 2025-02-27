import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

export default function ItemMasterTable() {
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
          const response = await AxiosInstance.get("/ItemMaster");
          const data = response.data.data;
          console.log("Fetched Data:", data); // Debugging
          setTableData(data);
        } catch (error) {
          setError("Something went wrong!");
        } finally {
          setLoading(false);
        }
      };

      const handleRowClick = (itemID) => {
        navigate(`/ItemMasterForm/${itemID}`);
      };

      const handleCreateNew = () => {
        navigate("/ItemMasterForm");
      };
       return (
          <Container className="mt-5" style={{ maxWidth: "100%" }}>
            {/* Create New Button */}
            <div
              className="d-flex justify-content-end mb-3"
              style={{
                position: "fixed", // Fix the button on the screen
                top: "100px", // Adjust the vertical position (distance from the top)
                right: "1265px", // Adjust the horizontal position (distance from the right edge)
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
            marginTop: "130px", // Maintain the top margin
            width: "120%", // Increase the table container width (set to 90% for more space)
            height: "700px", // Maintain the height of the container
            marginLeft: "-120px", // Center horizontally
            marginRight: "450px", // Center horizontally
          }}
        >
          <h5
            className="text-center mb-2"
            style={{
              backgroundColor: "#0d254b",
              color: "white",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Item Master Table
          </h5>
           <Table
                      striped
                      bordered
                      hover
                      className="mt-4"
                      style={{ width: "100%" }}
                    >
                      <thead className="bg-primary text-white text-center">
                        <tr>
                          <th>Item name</th>
                          <th>HSNCode</th>
                          <th>Item Type</th>
                          <th>Item Group</th>
                          <th>UOM</th>
                          <th>TaxTypeName</th>
                          <th>Status</th>
                          <th>UserName</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item, index) => (
                          <tr
                            key={item.itemID || index}
                            onClick={() => handleRowClick(item.itemID)}
                            style={{ cursor: "pointer" }}
                            className="text-center table-row-hover"
                          > 
                          
                            <td>{item.itemName}</td>
                            <td>{item.hsNCode}</td>
                            <td>{item.itemType}</td>
                            <td>{item.itemGroup}</td>
                            <td>{item.uOM}</td>
                            <td>{item.taxTypeName}</td>
                            <td>{item.status}</td>
                            <td>{item.userName}</td>
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
    