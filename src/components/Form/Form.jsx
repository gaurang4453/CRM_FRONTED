
import React from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../AxiosInstance";
import "/src/style/style.css";

function Form() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
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
    }
    
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
      <h1>Property Master <h/><h>
        <br></br>
      </h>Form</h1>

     

      <div>
        <label>Property Type Name : </label>
        <input {...register("propTypeName")} />
      </div>
      <br />

      <div>
        <label>Property Name : </label>
        <input {...register("propName")} />
      </div>
      <br />

      <div>
        <label>Property Value :</label>
        <input {...register("propValue")} />
      </div>
      <br />

      <div>
        <label>Status : </label>
        <input {...register("status")} />
      </div>
      <br />

      <div>
        <label>CUID :</label>
        <input {...register("CUID" )} placeholder="Numbers only" />
      </div>
      <br />

      <div className="submit-container">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default Form;
