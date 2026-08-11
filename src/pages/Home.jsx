import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobsService";
import JobCard from "../components/JobCard";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading jobs...</p>
      </div>
    );  }

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
    <main>
      <section className="bg-light py-5 mb-4">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">Find Your Next Opportunity</h1>
          <p className="lead text-muted">Browse jobs from companies looking for talented people like you.</p>
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Available Jobs</h2>
          <span className="text-muted">
            {jobs.length} jobs found
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="alert alert-info text-center">
            No jobs were found.
          </div>
        ) : (
          <div className="row g-4">
            {jobs.map((job) => (
              <div className="col-12 col-md-6 col-lg-4" key={job._id}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;