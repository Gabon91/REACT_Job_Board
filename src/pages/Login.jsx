import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/usersService";
import { useAuth } from "../contexts/AuthContext";
import loginSchema from "../validation/loginSchema";
import getErrorMessage from "../utils/getErrorMessage";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      const data = await loginUser(values);
      /* The server returns a JWT, but does not define whether it is 
      returned directly or inside an object.*/
      const token =
        typeof data === "string"
          ? data
          : data?.token || data?.jwt;

      if (!token) {
        throw new Error(
          "The server did not return a valid token."
        );
      }

      login(token);
      toast.success("Login successful!");
      navigate("/");
      } catch (error) {
        const message = getErrorMessage(error, "Login failed. Please try again.",
          {
            401: "Incorrect email or password.",
            423: "Your account is locked. Please try again later.",
          }
        );
        toast.error(message);

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="text-center mb-4">
                Login
              </h1>
              <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit} validateOnMount>
                {({ isSubmitting, isValid  }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label"> Email </label>
                      <Field id="email" name="email" type="email" className="form-control" placeholder="you@example.com"/>
                      <ErrorMessage name="email" component="div" className="text-danger small mt-1"/>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label"> Password </label>
                      <Field id="password" name="password" type="password" className="form-control" placeholder="Enter your password"/>
                      <ErrorMessage name="password" component="div" className="text-danger small mt-1"/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting || !isValid}>
                      {isSubmitting
                        ? "Logging in..."
                        : "Login"}
                    </button>
                  </Form>
                )}
              </Formik>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{" "}
                <Link to="/register"> Register </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;