import './App.css'
import { useForm } from "react-hook-form";

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
        <label>propid</label>
        <input {...register('propid',
          { 
            required: true,
             maxLength:{value:4, message:'no more than 4 dgits'} })}/>
             {errors.propid && <p>{errors.propid.message}</p>}
      </div>
      <br/>

      <div>
        <label>proptypename</label>
        <input {...register('proptypename')}/>
      </div>
      <br/>

      <div>
        <label>propname</label>
        <input {...register('propname')}/>
      </div>
      <br/>

      <div>
        <label>propvalue</label>
        <input {...register('propvalue')}/>
      </div>
      <br/>

      <div>
        <label>status</label>
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
