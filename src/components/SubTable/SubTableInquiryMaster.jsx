import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import useDropdownData from "../UseDropdownData";

const SubTableInquiryMaster = ({ id, initialRows = [], onRowsUpdate }) => {
  const [rows, setRows] = useState(
    initialRows.length > 0  
      ? initialRows
      : [
          {
            id: 1,
            itemName: "",
            description: "",
            uomid: "",
            qty: 1, // Ensure qty is never 0
            remarks: "",
          },
        ]
  );

  const { data: itemsOptions, error: itemsError } = useDropdownData("items");

  useEffect(() => {
    onRowsUpdate(rows);
  }, [rows, onRowsUpdate]);

  useEffect(() => {
    if (initialRows.length > 0) {
      setRows(initialRows);
    }
  }, [initialRows]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      itemName: "",
      description: "",
      uomid: "",
      qty: 1, // Ensure valid qty
      remarks: "",
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    onRowsUpdate(updatedRows);
  };

  const removeRow = (rowId) => {
    const updatedRows = rows
      .filter((row) => row.id !== rowId)
      .map((row, index) => ({
        ...row,
        id: index + 1, // Reorder IDs correctly
      }));
    setRows(updatedRows);
    onRowsUpdate(updatedRows);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
    onRowsUpdate(updatedRows);
  };

  if (itemsError) {
    console.error("Error fetching items:", itemsError);
  }

  return (
    <div className="container-fluid mt-4">
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
      <div className="table-responsive">
        <table
          className="table table-bordered w-100"
          style={{ minWidth: "85vw", marginLeft: "-10px" }}
        >
          <thead className="bg-dark text-white text-center">
            <tr>
              <th>SeqNo</th>
              <th>Item Name / Description</th>
              <th>UOM / Qty</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="text-center">{row.id}</td>
                <td>
                  <select
                    className="form-select"
                    value={row.itemName}
                    onChange={(e) =>
                      updateRow(index, "itemName", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      --Select--
                    </option>
                    {itemsOptions?.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="form-control mt-2"
                    placeholder="Description"
                    value={row.description}
                    onChange={(e) =>
                      updateRow(index, "description", e.target.value)
                    }
                  ></textarea>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UOM"
                    value={row.uomid}
                    onChange={(e) => updateRow(index, "uomid", e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Qty"
                    value={row.qty}
                    min="1"
                    onChange={(e) =>
                      updateRow(
                        index,
                        "qty",
                        Math.max(1, parseInt(e.target.value, 10) || 1)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Remarks"
                    value={row.remarks}
                    onChange={(e) =>
                      updateRow(index, "remarks", e.target.value)
                    }
                  />
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={addRow}
                  >
                    <FaPlus />
                  </button>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeRow(row.id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubTableInquiryMaster;
