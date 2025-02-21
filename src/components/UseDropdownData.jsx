import { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance"; // Ensure AxiosInstance is imported

const dropdownData = {
  status: {
    tableName: "PropMaster",
    fieldNameID: "PropValue",
    fieldNameValue: "PropName",
    fieldNameWhere: "PropTypeName",
    fieldValue: "Status",
  },
  entryby: {
    tableName: "UserMaster",
    fieldNameID: "UserID",
    fieldNameValue: "UserName",
    fieldNameWhere: "Status",
    fieldValue: "A",
  },

};

const useDropdownData = (dropdownKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = dropdownData[dropdownKey]; // Fix: Use correct object reference
        if (!params) {
          throw new Error(`Dropdown key not found: ${dropdownKey}`);
        }

        const response = await AxiosInstance.get("/commanDropdown/Get", {
          params: {
            tableName: params.tableName,
            fieldNameID: params.fieldNameID,
            fieldNameValue: params.fieldNameValue,
            fieldNameWhere: params.fieldNameWhere,
            fieldValue: params.fieldValue,
          },
        });

        setData(response.data.dropdownData || []);
        console.log("Response dropdown data:", response.data.dropdownData);
      } catch (err) {
        setError("Failed to fetch dropdown data: " + err.message);
      } finally {
        //  setLoading(false);
      }
    };

    fetchData(); // Fix: Correct function call
  }, [dropdownKey]);

  return { data, error };
};

export default useDropdownData;
