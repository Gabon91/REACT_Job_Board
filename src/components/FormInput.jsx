import { Field, ErrorMessage, useField } from "formik";

function FormInput({label, name, type = "text", placeholder = ""}) 
{
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label"> {label} </label>

      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${
          hasError ? "is-invalid" : ""
        }`}
        aria-invalid={hasError}
        aria-describedby={
          hasError
            ? `${name}-error`
            : undefined
        }
      />

      {hasError && 
      (<div id={`${name}-error`} className="invalid-feedback"> {meta.error} </div>)
      }
    </div>
  );
}


export default FormInput;