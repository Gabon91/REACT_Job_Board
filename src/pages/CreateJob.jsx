import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import jobSchema from "../validation/jobSchema";
import normalizeJob from "../utils/normalizeJob";
import { createJob } from "../services/jobsService";

function CreateJob() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    company: "",
    description: "",
    category: "",
    jobType: "",
    experienceLevel: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    phone: "",
    email: "",
    applyLink: "",
    imageUrl: "",
    imageAlt: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const jobData = normalizeJob(values);
      await createJob(jobData);
      toast.success("Job published successfully!");
      navigate("/my-jobs");
    } catch (error) {
      const message =
        error.response?.data?.message || error.response?.data || "Could not publish the job.";
      toast.error(typeof message === "string"? message: "Could not publish the job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="mb-4"> Post a New Job </h1>
              <Formik initialValues={initialValues} validationSchema={jobSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Job Title" name="title"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Company" name="company"/>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label"> Job Description </label>
                      <Field as="textarea" id="description" name="description" rows="5" className="form-control"/>
                      <ErrorMessage name="description" component="div" className="text-danger small mt-1"/>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Category" name="category" placeholder="Development"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Location" name="location" placeholder="Tel Aviv"/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"> Job Type </label>

                        <Field as="select" name="jobType" className="form-select">
                          <option value=""> Select job type </option>
                          <option value="full-time"> Full-Time </option>
                          <option value="part-time"> Part-Time </option>
                          <option value="freelance"> Freelance </option>
                          <option value="temporary"> Temporary </option>
                          <option value="internship"> Internship </option>
                        </Field>

                        <ErrorMessage name="jobType" component="div" className="text-danger small mt-1"/>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label"> Experience Level </label>
                        <Field as="select" name="experienceLevel" className="form-select">
                          <option value=""> Select experience </option>
                          <option value="entry level"> Entry Level </option>
                          <option value="junior"> Junior </option>
                          <option value="mid-level"> Mid-Level </option>
                          <option value="senior"> Senior </option>
                          <option value="team lead"> Team Lead </option>
                          <option value="management"> Management </option>
                        </Field>
                        <ErrorMessage name="experienceLevel" component="div" className="text-danger small mt-1"/>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h4>Salary</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Minimum Salary" name="minSalary" type="number"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Maximum Salary" name="maxSalary" type="number"/>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h4>Contact Details</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Phone" name="phone" type="tel"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Email" name="email" type="email"/>
                      </div>
                    </div>

                    <FormInput label="Application Link (Optional)" name="applyLink" placeholder="https://..."/>
                    <hr className="my-4" />
                    <h4>Job Image</h4>
                    <FormInput label="Image URL (Optional)" name="imageUrl" placeholder="https://..."/>
                    <FormInput label="Image Alt Text" name="imageAlt"/>

                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isSubmitting}>
                      {isSubmitting
                        ? "Publishing..."
                        : "Publish Job"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateJob;