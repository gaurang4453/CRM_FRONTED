import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import { Spinner, Table, Container, Button } from "react-bootstrap";

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

      // const userResponse = await AxiosInstance.get("/UserMaster");
      // const userData = userResponse.data.data;

      // const propTypeNameResponse = await AxiosInstance.get("/PropMaster"); // Fetch propTypeName data
      // const propTypeNameData = propTypeNameResponse.data.data;

      // setUserData(userData);
      // setPropTypeNameData(propTypeNameData); // Store propTypeName data
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

  // const getUserName = (cuid) => {
  //   const user = userData.find((user) => user.id === cuid);
  //   return user ? user.userName : "Unknown User";
  // };

  // const getTaxTypeName = (taxTypeId) => {
  //   const taxType = propTypeNameData.find((type) => type.id === taxTypeId);
  //   return taxType ? taxType.value : "Unknown Tax Type";
  // };

  return (
    <Container className="mt-5" style={{ maxWidth: "100%" }}>
      {/* Create New Button */}
      <div
        className="d-flex justify-content-end mb-3"
        style={{
          position: "fixed",
          top: "100px",
          right: "1295px",
          zIndex: "1000",
          padding: "5px 10px",
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
            marginTop: "130px",
            width: "120%",
            height: "700px",
            marginLeft: "-120px",
            marginRight: "450px",
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
                <th>Item Name</th>
                <th>Item Description</th>
                <th>UOMID</th>
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
