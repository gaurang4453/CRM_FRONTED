// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../styles/App.css'; 
function App() {
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors },
   } = useForm();

   function onSubmit(data) {
    console.log("Submitting the form",data);
   }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <h2>PropMaster Form</h2>
        <label>PropID  </label>
        <input {...register('propid',
          { 
            required: true,
             maxLength:{value:4, message:'no more than 4 digits'} })}/>
             {errors.propid && <p>{errors.propid.message}</p>}
      </div>
      <br/>

      <div>
        <label>PropTypeName </label>
        <input {...register('proptypename')}/>
      </div>
      <br/>

      <div>
        <label>PropName </label>
        <input {...register('propname')}/>
      </div>
      <br/>

      <div>
        <label>PropValue </label>
        <input {...register('propvalue')}/>
      </div>
      <br/>

      <div>
        <label>Status </label>
        <input {...register('status')}/>
      </div>
      <br/>

      <div>
        <label>CUID </label>
        <input {...register('CUID')}/>
      </div>
      <br/>

        <input type='submit'/>
    </form>
   
  )
}

export default App
