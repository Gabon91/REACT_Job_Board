import { useNavigate } from "react-router-dom";
import {FaBookmark,FaRegBookmark,FaMapMarkerAlt,FaBriefcase,FaMoneyBillWave,FaEdit,FaTrash} from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fallbackImage from "../assets/no_logo_company.png";
import getErrorMessage from "../utils/getErrorMessage";
import { useAuth } from "../contexts/AuthContext";
import {toggleSavedJob,deleteJob,} from "../services/jobsService";
import ConfirmationModal from "./ConfirmationModal";

function JobCard({job,onSavedChange,onDelete,
}) {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const currentUserId =
    user?.id || user?._id;

  const [isSaved, setIsSaved] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const formattedDate = job.createdAt
    ? new Date(
        job.createdAt
      ).toLocaleDateString("en-GB")
    : "Unknown";

  const imageUrl =
    job?.image?.url?.includes("example.com")
      ? fallbackImage
      : job?.image?.url || fallbackImage;

  const formattedSalary =
    job.salary?.min != null &&
    job.salary?.max != null
      ? `₪${job.salary.min.toLocaleString()} - ₪${job.salary.max.toLocaleString()}`
      : "Salary not specified";

  const isOwner =
    currentUserId &&
    String(job.recruiter_id) ===
      String(currentUserId);

  const canManage =
    Boolean(isAdmin || isOwner);

  useEffect(() => {
    if (!currentUserId) {
      setIsSaved(false);
      return;
    }

    const saved =
      job.savedBy?.some(
        (id) =>
          String(id) ===
          String(currentUserId)
      ) || false;

    setIsSaved(saved);
  }, [job.savedBy, currentUserId]);

  // -------------------------------------------------
  // Navigate to job details
  // -------------------------------------------------

  const handleCardClick = () => {
    navigate(`/jobs/${job._id}`);
  };

  const handleCardKeyDown = (event) => {
    // Prevent nested buttons from triggering
    // the card keyboard action.
    if (
      event.target !==
      event.currentTarget
    ) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      handleCardClick();
    }
  };

  // -------------------------------------------------
  // Save / Unsave
  // -------------------------------------------------

  const handleSave = async (event) => {
    event.stopPropagation();

    try {
      setSaving(true);

      await toggleSavedJob(job._id);

      const newSavedState =
        !isSaved;

      setIsSaved(newSavedState);

      toast.success(
        newSavedState
          ? "Job saved successfully!"
          : "Job removed from saved jobs."
      );

      onSavedChange?.(
        job._id,
        newSavedState
      );
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

  // -------------------------------------------------
  // Edit
  // -------------------------------------------------

  const handleEdit = (event) => {
    event.stopPropagation();

    navigate(
      `/jobs/edit/${job._id}`
    );
  };

  // -------------------------------------------------
  // Delete
  // -------------------------------------------------

  const handleDeleteClick = (event) => {
    event.stopPropagation();

    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    if (!deleting) {
      setShowDeleteModal(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteJob(job._id);

      toast.success(
        "Job deleted successfully."
      );

      setShowDeleteModal(false);

      // Notify the parent page so it can
      // remove the card without refreshing.
      onDelete?.(job._id);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Could not delete the job."
        )
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div
        className="card h-100 shadow-sm"
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        style={{
          cursor: "pointer",
        }}
      >
        <img
          src={imageUrl}
          className="card-img-top"
          alt={
            job.image?.alt ||
            `${job.company} logo`
          }
          style={{
            height: "220px",
            width: "100%",
            objectFit: "fill",
          }}
          onError={(event) => {
            event.currentTarget.onerror =
              null;

            event.currentTarget.src =
              fallbackImage;
          }}
        />

        <div className="card-body d-flex flex-column">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="card-title text-capitalize">
                {job.title}
              </h5>

              <h6 className="card-subtitle mb-3 text-muted text-capitalize">
                {job.company}
              </h6>
            </div>

            {/* Save button */}
            {isAuthenticated && (
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
                title={
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
            )}
          </div>

          {/* Location */}
          <p className="card-text">
            <FaMapMarkerAlt className="me-2" />

            <span className="text-capitalize">
              {job.location}
            </span>
          </p>

          {/* Type + Experience */}
          <p className="card-text">
            <FaBriefcase className="me-2" />

            <span className="text-capitalize">
              {job.jobType} ·{" "}
              {job.experienceLevel}
            </span>
          </p>

          {/* Salary */}
          <p className="card-text">
            <FaMoneyBillWave className="me-2" />

            {formattedSalary}
          </p>

          {/* Category */}
          <div className="mb-3">
            <span className="badge bg-secondary text-capitalize">
              {job.category}
            </span>
          </div>

          {/* Date */}
          <p className="text-muted small">
            Posted: {formattedDate}
          </p>

          {/* Normal View Job button */}
          <button
            type="button"
            className="btn btn-primary mt-auto"
            onClick={(event) => {
              event.stopPropagation();

              navigate(
                `/jobs/${job._id}`
              );
            }}
          >
            View Job
          </button>

          {/* Owner / Admin actions */}
          {canManage && (
            <div className="d-flex gap-2 mt-3 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-primary flex-grow-1"
                onClick={handleEdit}
              >
                <FaEdit className="me-2" />
                Edit
              </button>

              <button
                type="button"
                className="btn btn-outline-danger flex-grow-1"
                onClick={
                  handleDeleteClick
                }
                disabled={deleting}
              >
                <FaTrash className="me-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Job"
        message={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
        onConfirm={
          handleConfirmDelete
        }
        onCancel={
          handleCancelDelete
        }
        loading={deleting}
      />
    </>
  );
}

export default JobCard;