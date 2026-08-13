import {useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import FormInput from "../components/FormInput";
import {getJobById, updateJob} from "../services/jobsService";
import jobSchema from "../validation/jobSchema";
import normalizeJob from "../utils/normalizeJob";
import {useAuth} from "../contexts/AuthContext";
import getErrorMessage from "../utils/getErrorMessage";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user,isAdmin} = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUserId = user?.id || user?._id;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        const isOwner = data.recruiter_id === currentUserId;
        if (!isOwner && !isAdmin) {
          toast.error("You don't have permission to edit this job.");
          navigate("/", {replace: true,});
          return;
        }
        setJob(data);
      } catch (error) {
        setError(getErrorMessage(error,"Failed to load job."));
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchJob();
    }
  }, [
    id, currentUserId, isAdmin, navigate,]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status"/>
        <p className="mt-3"> Loading job... </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger"> {error} </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const initialValues = {
    title: job.title || "",
    company: job.company || "",
    description: job.description || "",
    category: job.category || "",
    jobType: job.jobType || "",
    experienceLevel: job.experienceLevel || "",
    location: job.location || "",
    minSalary: job.salary?.min ?? "",
    maxSalary: job.salary?.max ?? "",
    phone: job.phone || "",
    email: job.email || "",
    applyLink: job.applyLink || "",
    imageUrl: job.image?.url || "",
    imageAlt: job.image?.alt || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const jobData = {...normalizeJob(values), jobNumber: job.jobNumber};
      await updateJob(id,jobData);
      toast.success("Job updated successfully!");
      navigate("/my-jobs");
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Could not update the job."
        )
      );
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
              <h1 className="mb-4"> Edit Job </h1>
              <Formik initialValues={initialValues} enableReinitialize validationSchema={jobSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, isValid, dirty }) => (
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
                        <FormInput label="Category" name="category"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Location" name="location"/>
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
                        <ErrorMessage name="jobType" component="div" className="text-danger small mt-1" />
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
                    <h4> Contact Details </h4>

                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Phone" name="phone" type="tel"/>
                      </div>

                      <div className="col-md-6">
                        <FormInput label="Email" name="email" type="email"/>
                      </div>
                    </div>

                    <FormInput label="Application Link (Optional)" name="applyLink"/>
                    <hr className="my-4" />
                    <h4> Job Image </h4>
                    <FormInput label="Image URL (Optional)" name="imageUrl"/>
                    <FormInput label="Image Alt Text" name="imageAlt"/>

                    <div className="d-flex gap-2 mt-4">
                      <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={() => navigate("/my-jobs")}> Cancel </button>
                      <button type="submit" className="btn btn-primary flex-grow-1" 
                      disabled={isSubmitting || !isValid || !dirty}>
                        {isSubmitting
                          ? "Updating..."
                          : "Update Job"}
                      </button>
                    </div>
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

export default EditJob;