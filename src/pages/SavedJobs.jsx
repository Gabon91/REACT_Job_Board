import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";
import { getAllJobs } from "../services/jobsService";
import { useAuth } from "../contexts/AuthContext";
import getErrorMessage from "../utils/getErrorMessage";
import { toast } from "react-toastify";

function SavedJobs() {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUserId = user?.id || user?._id;

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const jobs = await getAllJobs();
        const filteredJobs = jobs.filter((job) => job.savedBy?.includes(currentUserId));
        setSavedJobs(filteredJobs);
      } catch (error) {
        const message = getErrorMessage(error,"Failed to load saved jobs.");
        setError(message);
        if (!error.response) {
          toast.error(message, {toastId: "server-connection-error"});
        }      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchSavedJobs();
    }
  }, [currentUserId]);

  const handleSavedChange = (jobId,isSaved) => {
    if (!isSaved) {
      setSavedJobs((jobs) =>
        jobs.filter((job) => job._id !== jobId)
      );
    }
  };

if (loading) {
  return (
    <main className="container py-5">
      <h1 className="mb-4"> Saved Jobs </h1>
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
        <div className="alert alert-danger"> {error} </div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4"> Saved Jobs </h1>
      {savedJobs.length === 0 ? (
        <div className="text-center py-5 border rounded">
          <h3> No Saved Jobs </h3>
          <p className="text-muted"> You haven't saved any jobs yet.</p>
          <Link to="/"className="btn btn-primary"> Browse Jobs</Link>
        </div>
      ) : (
        <div className="row g-4">
          {savedJobs.map((job) => (
            <div key={job._id} className="col-12 col-md-6 col-lg-4">
              <JobCard job={job} onSavedChange={ handleSavedChange}/>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default SavedJobs;