import { Field, ErrorMessage } from "formik";

function FormInput({label, name, type = "text", placeholder = ""}) 
{
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label"> {label} </label>
      <Field id={name} name={name} type={type} className="form-control" placeholder={placeholder}/>
      <ErrorMessage name={name} component="div" className="text-danger small mt-1"/>
    </div>
  );
}

export default FormInput;