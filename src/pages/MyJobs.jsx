import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FaEdit, FaTrash, FaPlus} from "react-icons/fa";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import {getMyJobs, deleteJob} from "../services/jobsService";
import JobCardSkeleton from "../components/JobCardSkeleton";
import getErrorMessage from "../utils/getErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
const JOBS_PER_PAGE = 6;

function MyJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data);
      } catch (error) {
        const message = getErrorMessage(error,"Failed to load your jobs.");
        setError(message);
        if (!error.response) {
          toast.error(message, {toastId: "server-connection-error"});
        }      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
  };

  const handleCancelDelete = () => {
    if (!deleting) {
      setJobToDelete(null);
    }
  };

  const handleConfirmDelete =
    async () => {
      if (!jobToDelete) {
        return;
      }
      try {
        setDeleting(true);
        await deleteJob(jobToDelete._id);
        setJobs((currentJobs) =>
          currentJobs.filter((job) =>
              job._id !==
              jobToDelete._id
          )
        );
        toast.success("Job deleted successfully.");
        setJobToDelete(null);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not delete the job."));
      }finally {
        setDeleting(false);
      }
    };

  /* When deleting the only job on a page (1 out of 6 slots) 
     move back one page and delete the old page.*/
  useEffect(() => {
    const pages = Math.ceil(jobs.length / JOBS_PER_PAGE);
    if (currentPage > pages && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [jobs, currentPage]);

if (loading) {
  return (
    <main className="container py-5">
      <h1 className="mb-4"> My Jobs </h1>
      <LoadingSpinner message="Loading your jobs..." />
      <div className="row g-4">
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <JobCardSkeleton />
            </div>
          )
        )}
      </div>
    </main>
  );
}

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <div className=" d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="mb-1"> My Jobs </h1>
          <p className="text-muted mb-0"> Manage the jobs you have published. </p>
        </div>
        <Link to="/jobs/create" className="btn btn-primary">
          <FaPlus className="me-2" /> Post New Job </Link>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs published yet"
          message="Publish your first job to start recruiting candidates."
          actionText="Post a New Job"
          actionTo="/jobs/create"
        />
      ) : ( 
        <>
          <div className="row g-4">
            {currentJobs.map((job) => (
                <div key={job._id} className="col-12 col-md-6 col-lg-4">
                  <JobCard job={job} />
                </div>
              )
            )}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        </>
      )}

      <ConfirmationModal
        show={Boolean(jobToDelete)}
        title="Delete Job"
        message={
          jobToDelete
            ? `Are you sure you want to delete "${jobToDelete.title}"?`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleting}
      />
    </main>
  );
}

export default MyJobs;