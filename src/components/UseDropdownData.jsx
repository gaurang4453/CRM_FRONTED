import { useEffect, useState } from "react";
import AxiosInstance from "/src/AxiosInstance"; // Ensure AxiosInstance is imported

const dropdownData = {
  status: {
    tableName: "PropMaster",
    fieldNameID: "PropValue",
    fieldNameValue: "PropName",
    fieldNameWhere: "PropTypeName",
    fieldValue: "Status",
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
          setError(`Invalid dropdown key: ${dropdownKey}`);
          console.error(`Invalid dropdown key: ${dropdownKey}`);
          return;
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

        console.log(`Dropdown Data for "${dropdownKey}":`, response.data);

        // Validate API response structure
        if (response.data?.data?.length > 0) {
          setData(response.data.data);
        } else {
          console.warn(`No data found for dropdown key: ${dropdownKey}`);
          setData([]); // Ensure state remains an empty array if no data
        }
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setError(`Failed to fetch dropdown data: ${err.message}`);
      }
    };

    fetchData();
  }, [dropdownKey]);

  return { data, error };
};

export default useDropdownData;
