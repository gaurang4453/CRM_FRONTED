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

  entryby: {
    tableName: "UserMaster",
    fieldNameID: "UserID",
    fieldNameValue: "UserName",
    fieldNameWhere: "Status",
    fieldValue: "A",
  },
  companies: {
    tableName: 'CompanyMaster',
    fieldNameID: 'CompanyID',
    fieldNameValue: 'CompanyName',
    fieldNameWhere: 'Status',
    fieldValue: 'A'
  },

branches: {
    tableName: 'BranchMaster',
    fieldNameID: 'BranchID',
    fieldNameValue: 'BranchName',
    fieldNameWhere: 'Status',
    fieldValue: 'A'
  },

taxTypes: {
    tableName: 'PropMaster',
    fieldNameID: 'PropName',
    fieldNameValue: 'PropValue',
    fieldNameWhere: 'PropTypeName',
    fieldValue: 'TaxType'
  },

uoms: {
    tableName: 'UOMMST',
    fieldNameID: 'UOMID',
    fieldNameValue: 'UOM',
    fieldNameWhere: 'Status',
    fieldValue: 'A'
  },

referenceBy: {
    tableName: 'PropMaster',
    fieldNameID: 'PropName',
    fieldNameValue: 'PropValue',
    fieldNameWhere: 'PropTypeName',
    fieldValue: 'ReferenceBy'
  },

items: {
    tableName: 'ItemMaster',
    fieldNameID: 'ItemID',
    fieldNameValue: 'ItemName',
    fieldNameWhere: 'Status',
    fieldValue: 'A'
  },

inquiryID: {
    tableName: 'InquiryMaster',
    fieldNameID: 'InquiryID',
    fieldNameValue: 'InquiryNo',
    fieldNameWhere: 'Status',
    fieldValue: 'A'
  },

nextprocess: {
    tableName: 'PropMaster',
    fieldNameID: 'PropName',
    fieldNameValue: 'PropValue',
    fieldNameWhere: 'PropTypeName',
    fieldValue: 'INProcess'
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
