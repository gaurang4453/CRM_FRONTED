import { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance"; // Ensure AxiosInstance is imported
import { set } from "react-hook-form";

const dropdownData = {
  status: {
    tableName: "PropMaster",
    fieldNameID: "PropValue",
    fieldNameValue: "PropName",
    fieldNameWhere: "PropTypeName",
    fieldValue: "Status",
  },
  role: {
    tableName: "RoleMaster",
    fieldNameID: "RoleID",
    fieldNameValue: "RoleName",
    fieldNameWhere: "Status",
    fieldValue: "A",
  },

  user: {
    tableName: "UserMaster",
    fieldNameID: "UserName",
    fieldNameValue: "UserID",
    fieldNameWhere: "Status",
    fieldValue: "A",
  },

  // Add more dropdown keys here if needed
};

const useDropdownData = (dropdownKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = dropdownData[dropdownKey];
        if (!params) {
          throw new Error(`Dropdown key not found: ${dropdownKey}`);
        }

        const response = await AxiosInstance.get("/CommonDropdown", {
          params: {
            tableName: params.tableName,
            fieldNameID: params.fieldNameID,
            fieldNameValue: params.fieldNameValue,
            fieldNameWhere: params.fieldNameWhere,
            fieldValue: params.fieldValue,
          },
        });

        // Log the response data
        console.log("Fetched Dropdown Data:", response.data);

        // Ensure response is in the correct structure
        if (response.data && response.data.data) {
          setData(response.data.data); // Set the dropdown data
        } else {
          throw new Error("Invalid data structure from API.");
        }
      } catch (err) {
        setError("Failed to fetch dropdown data: " + err.message);
      }
    };

    fetchData();
  }, [dropdownKey]);

  return { data, error };
};

export default useDropdownData;
