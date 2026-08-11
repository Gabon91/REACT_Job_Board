function SearchFilters({ filters, onChange, onClear }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3">Search Jobs</h4>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Job Title</label>
            <input type="text" className="form-control" name="title" value={filters.title} onChange={handleChange} placeholder="React Developer..."/>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Company</label>
            <input type="text" className="form-control" name="company" value={filters.company} onChange={handleChange} placeholder="Company Name..."/>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" name="category" value={filters.category} onChange={handleChange} placeholder="Category..."/>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={filters.location} onChange={handleChange} placeholder="Tel Aviv..."/>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Job Type</label>
            <select className="form-select" name="jobType" value={filters.jobType} onChange={handleChange}>
              <option value="">All Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="freelance">Freelance</option>
              <option value="temporary">Temporary</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Experience</label>
            <select className="form-select" name="experienceLevel" value={filters.experienceLevel} onChange={handleChange}>
              <option value="">All Levels</option>
              <option value="entry level">Entry Level</option>
              <option value="junior">Junior</option>
              <option value="mid-level">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="team lead">Team Lead</option>
              <option value="management">Management</option>
            </select>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Minimum Salary</label>
            <input type="number" min="0" className="form-control" name="minSalary" value={filters.minSalary} onChange={handleChange} placeholder="20,000"/>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Maximum Salary</label>
            <input type="number" min="0" className="form-control" name="maxSalary" value={filters.maxSalary} onChange={handleChange} placeholder="40,000"/>
          </div>
        </div>

        <div className="mt-3">
          <button type="button" className="btn btn-outline-secondary" onClick={onClear}> Clear Filters </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;