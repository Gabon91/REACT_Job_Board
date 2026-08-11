import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import fallbackImage from "../assets/no_logo_company.png";

function JobCard({ job }) {

  const formattedDate = new Date(job.createdAt).toLocaleDateString("en-GB");
  const imageUrl =
  job?.image?.url?.includes("example.com")
    ? fallbackImage
    : job?.image?.url || fallbackImage;

  const formattedSalary =
    job.salary?.min && job.salary?.max
      ? `₪${job.salary.min.toLocaleString()} - ₪${job.salary.max.toLocaleString()}`
      : "Salary not specified";

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={job.image?.alt || `${job.company} logo`}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "fill",
        }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage;
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize">
          {job.title}
        </h5>

        <h6 className="card-subtitle mb-3 text-muted text-capitalize">
          {job.company}
        </h6>

        <p className="card-text">
          <FaMapMarkerAlt className="me-2" />
          <span className="text-capitalize">{job.location}</span>
        </p>

        <p className="card-text">
          <FaBriefcase className="me-2" />
          <span className="text-capitalize">
            {job.jobType} · {job.experienceLevel}
          </span>
        </p>

        <p className="card-text">
          <FaMoneyBillWave className="me-2" />
          {formattedSalary}
        </p>

        <div className="mb-3">
          <span className="badge bg-secondary text-capitalize">
            {job.category}
          </span>
        </div>

        <p className="text-muted small">
          Posted: {formattedDate}
        </p>

        <Link
          to={`/jobs/${job._id}`}
          className="btn btn-primary mt-auto"
        >
          View Job
        </Link>
      </div>
    </div>
  );
}

export default JobCard;