import React from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../AxiosInstance";
import "/src/style/style.css";
import Navbar from "../Navbar/Navbar";

function PropMasterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to submit form data
  const handleFormSubmit = async (data) => {
    console.log("Submitting the form:", data);
    const payload = {
      propID: 0,
      propTypeName: data.propTypeName,
      propName: data.propName,
      propValue: data.propValue,
      status: data.status,
      CUID: data.CUID,
    };

    try {
      const response = await AxiosInstance.post("/PropMaster", payload);
      console.log("Successfully submitted data:", response);
      alert("Successfully submitted data");
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
      <h1>Property Master Form</h1>

      <div className="form-field">
        <label>Property Type Name : </label>
        <input {...register("propTypeName")} />
      </div>

      <div className="form-field">
        <label>Property Name : </label>
        <input {...register("propName")} />
      </div>

      <div className="form-field">
        <label>Property Value :</label>
        <input {...register("propValue")} />
      </div>

      <div className="form-field">
        <label>Status : </label>
        <input {...register("status")} />
      </div>

      <div className="form-field">
        <label>CUID :</label>
        <input {...register("CUID")} placeholder="Numbers only" />
      </div>

      <div className="submit-container">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default PropMasterForm;
