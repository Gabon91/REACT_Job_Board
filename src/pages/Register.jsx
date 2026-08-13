import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import registerSchema from "../validation/registerSchema";
import { registerUser } from "../services/usersService";
import normalizeUser from "../utils/normalizeUser";

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    state: "",
    zip: "",
    imageUrl: "",
    imageAlt: "",
    isRecruiter: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = normalizeUser(values);
      await registerUser(userData);
      toast.success("Registration completed successfully!");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || "Registration failed. Please try again.";
      toast.error(typeof message === "string"? message: "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4"> Create Account </h1>
              <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <h4 className="mb-3"> Personal Details </h4>
                    <div className="row">
                      <div className="col-md-4">
                        <FormInput label="First Name" name="firstName"/>
                      </div>
                      <div className="col-md-4">
                        <FormInput label="Middle Name" name="middleName"/>
                      </div>
                      <div className="col-md-4">
                        <FormInput label="Last Name" name="lastName"/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Phone" name="phone" type="tel" placeholder="+972"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Email" name="email" type="email"/>
                      </div>
                    </div>

                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                    />

                    <hr className="my-4" />

                    <h4 className="mb-3">
                      Address
                    </h4>

                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Country" name="country"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="City" name="city"/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-8">
                        <FormInput label="Street" name="street"/>
                      </div>

                      <div className="col-md-4">
                        <FormInput label="House Number" name="houseNumber" type="number"/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="State / District (Optional)" name="state"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Zip Code (Optional)" name="zip"/>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h4 className="mb-3"> Profile Image </h4>
                    <FormInput label="Image URL (Optional)" name="imageUrl" placeholder="https://..."/>
                    <FormInput label="Image Alt Text" name="imageAlt"/>

                    <hr className="my-4" />
                    <div className="form-check mb-4">
                      <Field id="isRecruiter" name="isRecruiter" type="checkbox" className="form-check-input"/>
                      <label htmlFor="isRecruiter" className="form-check-label"> Register as a recruiter </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                      {isSubmitting? "Creating account..." : "Create Account"}
                    </button>
                  </Form>
                )}
              </Formik>

              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login"> Login </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;