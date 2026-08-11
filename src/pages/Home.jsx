import { useEffect, useMemo, useState } from "react";
import { getAllJobs } from "../services/jobsService";
import JobCard from "../components/JobCard";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";
import useDebounce from "../hooks/useDebounce";

const JOBS_PER_PAGE = 6;

const initialFilters = {
  title: "",
  company: "",
  category: "",
  location: "",
  jobType: "",
  experienceLevel: "",
  minSalary: "",
  maxSalary: "",
};

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedFilters = useDebounce(filters, 300);

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

  useEffect(() => { setCurrentPage(1);}, [debouncedFilters]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";
      const category = job.category?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";
      const searchTitle = debouncedFilters.title.trim().toLowerCase();
      const searchCompany = debouncedFilters.company.trim().toLowerCase();
      const searchCategory =debouncedFilters.category.trim().toLowerCase();
      const searchLocation = debouncedFilters.location.trim().toLowerCase();
      const matchesTitle = !searchTitle || title.includes(searchTitle);
      const matchesCompany = !searchCompany || company.includes(searchCompany);
      const matchesCategory = !searchCategory || category.includes(searchCategory);
      const matchesLocation = !searchLocation || location.includes(searchLocation);
      const matchesJobType = !debouncedFilters.jobType || job.jobType === debouncedFilters.jobType;
      const matchesExperience = !debouncedFilters.experienceLevel || job.experienceLevel === debouncedFilters.experienceLevel;
      const minSalary = 
        debouncedFilters.minSalary
          ? Number(debouncedFilters.minSalary)
          : null;

      const maxSalary =
        debouncedFilters.maxSalary
          ? Number(debouncedFilters.maxSalary)
          : null;

      const matchesMinSalary = minSalary === null || job.salary?.max >= minSalary;
      const matchesMaxSalary = maxSalary === null || job.salary?.min <= maxSalary;
      return (
        matchesTitle &&
        matchesCompany &&
        matchesCategory &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesMinSalary &&
        matchesMaxSalary
      );
    });
  }, [jobs, debouncedFilters]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  const handleClearFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  };
  
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
        <SearchFilters
          filters={filters}
          onChange={setFilters}
          onClear={handleClearFilters}
        ></SearchFilters>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Available Jobs</h2>
          <span className="text-muted">
            {filteredJobs.length}
            {" "}
            {filteredJobs.length === 1 ? "job " : "jobs "}
            found
          </span>        
        </div>

        {jobs.length === 0 ? (
          <div className="alert alert-info text-center"> No jobs were found. </div>
        ) : (
          <>
            <div className="row g-4">
              {currentJobs.map((job) => (
                <div className="col-12 col-md-6 col-lg-4" key={job._id}> 
                <JobCard job={job}></JobCard>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </> 
        )}
      </section>
    </main>
  );
}

export default Home;