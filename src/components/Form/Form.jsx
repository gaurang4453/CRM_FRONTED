// import React, { useState,useEffect } from "react";
// import AxiosInstance from "../../AxiosInstance";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     PropTypeName: "",
//     PropName: "",
//     PropValue: "",
//     Status: "",
//     CUID: ""
//   });
//  const [data, setData] = useState([]);
//  const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await AxiosInstance.post("/PropMaster");
// //         // setData(response.data);
// //         console.log("Successfully fetched data: ",response.data);
// //         alert("Successfully fetched data");
// //         // setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     };
    
// //   }, []);

// const onSubmit = (data) => {
//     try {
//         const response = AxiosInstance.post("/PropMaster", data);
//         console.log("Successfully fetched data: ",response.data);
//         alert("Successfully fetched data");
//     } catch (error) {
//         console.log("Error:",error);
//         alert("Error");
//     }
// }
    
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form Submitted:", formData);
// //   };

//   return (
//     <div className="container">
//       <h1>PropMaster Form</h1><br></br>
//       <form onSubmit={handleSubmit(onSubmit)} className="form">
//         <div className="form-group">
//           <label>Property Type Name:</label><br></br>
//           <input type="text" name="PropTypeName" value={formData.PropTypeName} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Property Name:</label><br></br>
//           <input type="text" name="PropName" value={formData.PropName} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Property Value:</label><br></br>
//           <input type="text" name="PropValue" value={formData.PropValue} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Status:</label><br></br>
//           <input type="text" name="Status" value={formData.Status} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Created User ID:</label><br></br>
//           <input type="number" name="CUID" value={formData.CUID} onChange={handleChange} />
//         </div>
//         <button type="submit" className="submit-button">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Form;

// import React, { useState } from "react";
// import AxiosInstance from "../../AxiosInstance.js";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     PropTypeName: "",
//     PropName: "",
//     PropValue: "",
//     Status: "",
//     CUID: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevents page reload

//     try {
//       const response = await AxiosInstance.post("/PropMaster", formData);
//       console.log("Successfully submitted data:", response.data);
//       alert("Successfully submitted data");
//     } catch (error) {
//       console.log("Error:", error);
//       alert("Error submitting data");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>PropMaster Form</h1>
//       <br />
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label>Property Type Name:</label>
//           <br />
//           <input type="text" name="PropTypeName" value={formData.PropTypeName} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Property Name:</label>
//           <br />
//           <input type="text" name="PropName" value={formData.PropName} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Property Value:</label>
//           <br />
//           <input type="text" name="PropValue" value={formData.PropValue} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Status:</label>
//           <br />
//           <input type="text" name="Status" value={formData.Status} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Created User ID:</label>
//           <br />
//           <input type="number" name="CUID" value={formData.CUID} onChange={handleChange} />
//         </div>
//         <button type="submit" className="submit-button">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Form;





// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "/src/style/style.css";
function App() {
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors },
    reset 
   } = useForm();

   function onSubmit(data) {
    console.log("Submitting the form",data);
    reset();
   }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="form" >
        <h1>PropMaster Form</h1>
      <div>
        <label>PropID : </label>
        <input {...register('propid', 
          { 
            required: { value: true, message: 'fill above feild' } 
          })}/>
             {errors.propid && <p>{errors.propid.message}</p>}
      </div>
      <br/>

      <div>
        <label>PropTypeName : </label>
        <input {...register('proptypename')}/>
      </div>
      <br/>

      <div>
        <label>PropName : </label>
        <input {...register('propname')}/>
      </div>
      <br/>

      <div>
        <label>PropValue :</label>
        <input {...register('propvalue')}/>
      </div>
      <br/>

      <div>
        <label>Status : </label>
        <input {...register('status')}/>
      </div>
      <br/>

      <div>
        <label>CUID :</label>
        <input {...register('CUID') }/>
       
      </div>
      <br/>

        <input type='submit'/>

    </form>
   
  )
}

export default App
