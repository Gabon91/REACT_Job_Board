import { Link } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import fallbackImage from "../assets/no_logo_company.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "../utils/getErrorMessage";
import { useAuth } from "../contexts/AuthContext";
import { toggleSavedJob } from "../services/jobsService";

function JobCard({ job, onSavedChange }) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString("en-GB");
  const { user, isAuthenticated } = useAuth();
  const currentUserId = user?.id || user?._id;
  const imageUrl =
    job?.image?.url?.includes("example.com")
      ? fallbackImage
      : job?.image?.url || fallbackImage;

  const formattedSalary =
    job.salary?.min && job.salary?.max
      ? `₪${job.salary.min.toLocaleString()} - ₪${job.salary.max.toLocaleString()}`
      : "Salary not specified";


const [isSaved, setIsSaved] = useState(
  Boolean(currentUserId && job.savedBy?.includes(currentUserId)));

useEffect(() => {
  setIsSaved(Boolean(currentUserId && job.savedBy?.includes(currentUserId)));
}, [job.savedBy, currentUserId]);

const handleSave = async () => {
  try {
    setSaving(true);
    await toggleSavedJob(job._id);
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    toast.success(
      newSavedState
        ? "Job saved successfully!"
        : "Job removed from saved jobs."
    );

    onSavedChange?.(job._id,newSavedState);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Could not update saved job."
        )
      );
    } finally {
    setSaving(false);
  }
};


const [saving, setSaving] = useState(false);
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
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title text-capitalize"> {job.title} </h5>
            <h6 className="card-subtitle mb-3 text-muted text-capitalize"> {job.company} </h6>
          </div>
          {isAuthenticated && (
            <div className="d-flex justify-content-end mb-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleSave}
                disabled={saving}
                aria-label={
                  isSaved
                    ? "Remove from saved jobs"
                    : "Save job"
                }
              >
                {isSaved ? (
                  <FaBookmark />
                ) : (
                  <FaRegBookmark />
                )}
              </button>
            </div>
          )}
        </div>

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

        <Link to={`/jobs/${job._id}`} className="btn btn-primary mt-auto"> View Job </Link>
      </div>
    </div>
  );
}

export default JobCard;