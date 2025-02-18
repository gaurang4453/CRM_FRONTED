import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AxiosInstance from "../../AxiosInstance"; // Ensure this path is correct

function PropmasterTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AxiosInstance.get("/PropMaster");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setTableData(response.data.data);
        } else if (Array.isArray(response.data)) {
          setTableData(response.data);
        } else {
          setError("Invalid data format received from API.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle row click
  const handleRowClick = (propID) => {
    navigate(`/edit-property/${propID}`); // Redirects to edit page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Propmaster Table</h2>
      {tableData.length > 0 ? (
        <table className="table mt-4 table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Property Type Name</th>
              <th>Property Name</th>
              <th>Property Value</th>
              <th>Status</th>
              <th>CUID</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={item.propID || index}
                onClick={() => handleRowClick(item.propID)}
                style={{ cursor: "pointer" }} // Change cursor to indicate clickability
              >
                <td>{index + 1}</td>
                <td>{item.propTypeName}</td>
                <td>{item.propName}</td>
                <td>{item.propValue}</td>
                <td>{item.status}</td>
                <td>{item.CUID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default PropmasterTable;
