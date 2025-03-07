import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import "../style/style.css";

export default function ItemMasterTable() {
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [propTypeNameData, setPropTypeNameData] = useState([]); // Add propTypeName data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const itemResponse = await AxiosInstance.get("/ItemMaster");
      const itemData = itemResponse.data.data;
      console.log("Fetched Item Data:", itemData);

      setTableData(itemData);
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
        <div className="shadow-lg table-h1" >
          <h5 className="text-center h1label" >Item Master Table</h5>
          <Table striped bordered hover className="alltablestyle" >
            <thead className="text-center">
              <tr>
                <th>Item name</th>{" "}
                <th>HSNCode</th>{" "}
                <th>Item Name</th>{" "}
                <th>Item Description</th>{" "}
                <th>UOMID</th>{" "}
                <th>TaxTypeName</th>{" "}
                <th>Status</th>{" "}
                <th>UserName</th>{" "}
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
                  <td>{item.itemName || item.itemName}</td>
                  <td>{item.hsNCode || item.hsncOde}</td>
                  <td>{item.itemName || item.itemName}</td>
                  <td>{item.description || item.Description}</td>
                  <td>{item.uomid}</td>
                  <td>{item.taxTypeName}</td>
                  <td>{item.status}</td>
                  <td>{item.entryBy}</td>
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
