import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaHashtag,
} from "react-icons/fa";

import { getJobById } from "../services/jobsService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          setError("Failed to load job details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-3">Loading job details...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-3">Job Not Found</h1>

        <p className="text-muted">
          The job you are looking for does not exist or was removed.
        </p>

        <Link to="/" className="btn btn-primary">
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const fallbackImage =
    "https://placehold.co/800x400?text=Company+Logo";

  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB")
    : "Not available";

  const formattedSalary =
    job.salary?.min !== undefined && job.salary?.max !== undefined
      ? `₪${job.salary.min.toLocaleString()} - ₪${job.salary.max.toLocaleString()}`
      : "Salary not specified";

  return (
    <main className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Back to Jobs
      </Link>

      <div className="card shadow-sm">
        <img
          src={job.image?.url || fallbackImage}
          alt={job.image?.alt || `${job.company} logo`}
          className="card-img-top"
          style={{
            maxHeight: "400px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />

        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div>
              <h1 className="text-capitalize mb-2">
                {job.title}
              </h1>

              <h4 className="text-muted text-capitalize">
                {job.company}
              </h4>
            </div>

            <div>
              <span className="badge bg-primary fs-6 text-capitalize">
                {job.category}
              </span>
            </div>
          </div>

          <hr />

          <div className="row g-4 my-2">
            <div className="col-12 col-md-6">
              <p>
                <FaMapMarkerAlt className="me-2" />
                <strong>Location:</strong>{" "}
                <span className="text-capitalize">
                  {job.location}
                </span>
              </p>

              <p>
                <FaBriefcase className="me-2" />
                <strong>Job Type:</strong>{" "}
                <span className="text-capitalize">
                  {job.jobType}
                </span>
              </p>

              <p>
                <FaBriefcase className="me-2" />
                <strong>Experience:</strong>{" "}
                <span className="text-capitalize">
                  {job.experienceLevel}
                </span>
              </p>

              <p>
                <FaMoneyBillWave className="me-2" />
                <strong>Salary:</strong> {formattedSalary}
              </p>
            </div>

            <div className="col-12 col-md-6">
              <p>
                <FaEnvelope className="me-2" />
                <strong>Email:</strong>{" "}
                <a href={`mailto:${job.email}`}>
                  {job.email}
                </a>
              </p>

              <p>
                <FaPhone className="me-2" />
                <strong>Phone:</strong>{" "}
                <a href={`tel:${job.phone}`}>
                  {job.phone}
                </a>
              </p>

              <p>
                <FaCalendarAlt className="me-2" />
                <strong>Posted:</strong> {formattedDate}
              </p>

              <p>
                <FaHashtag className="me-2" />
                <strong>Job Number:</strong>{" "}
                {job.jobNumber}
              </p>
            </div>
          </div>

          <hr />

          <section className="my-4">
            <h3>Job Description</h3>

            <p className="mt-3">
              {job.description}
            </p>
          </section>

          {job.applyLink && (
            <>
              <hr />

              <div className="text-center mt-4">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-lg"
                >
                  Apply for this Job
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default JobDetails;