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
          Item Master Table
        </h5>
        <div className="table-responsive">
          <table
            className="table table-bordered w-100"
            style={{ minWidth: "85vw", marginLeft: "-10px" }}
          >
            <thead className="bg-dark text-white text-center">
              <tr>
                <th style={{ width: "3%" }}>SeqNo</th>
                <th style={{ width: "7%" }}>Item Name / Description</th>
                <th style={{ width: "7%" }}>UOM / Qty</th>
                <th style={{ width: "7%" }}>Remarks</th>
                <th style={{ width: "5%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} style={{ height: "80px" }}>
                  <td className="text-center bg-light align-middle">
                    {row.id}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <select
                        id="items"
                        {...register("items", { required: true })}
                        className="form-select"
                        defaultValue=""
                        style={{
                          height: "30px",
                          padding: "0.2rem",
                          border: "2px solid rgb(243, 185, 78)",
                          fontSize: "14px",
                          width: "360px",
                        }}
                      >
                        <option value="" disabled>
                          --Select--
                        </option>
                        {itemsOptions?.length > 0 ? (
                          itemsOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.value}
                            </option>
                          ))
                        ) : (
                          <option disabled>No item options available</option>
                        )}
                      </select>
                    </div>
                    <textarea
                      className="form-control mt-2"
                      placeholder="Description"
                      rows="2"
                      value={row.description}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].description = e.target.value;
                        setRows(updatedRows);
                      }}
                    ></textarea>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="UOM"
                      value={row.uom}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].uom = e.target.value;
                        setRows(updatedRows);
                      }}
                    />
                    <input
                      type="number"
                      className="form-control mt-2"
                      placeholder="Qty"
                      value={row.qty}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        const parsedQty = parseInt(e.target.value, 10);
                        updatedRows[index].qty = isNaN(parsedQty)
                          ? 0
                          : parsedQty;
                        setRows(updatedRows);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Remarks"
                      value={row.remarks}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].remarks = e.target.value;
                        setRows(updatedRows);
                      }}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <button type="button" className="btn btn-primary me-2" onClick={addRow}>
                      <FaPlus />
                    </button>
                    {rows.length > 1 && (
                      <button type="button"
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
    </div>
  );
};

export default SubTableInquiryMaster;
