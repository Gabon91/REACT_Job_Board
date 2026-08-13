function JobCardSkeleton() {
  return (
    <div className="card h-100 shadow-sm" aria-hidden="true">
      <div className="placeholder-glow bg-secondary-subtle" style={{height: "200px"}}/>
      <div className="card-body">
        <div className="placeholder-glow">
          <h5>
            <span className="placeholder col-8" />
          </h5>

          <p>
            <span className="placeholder col-6" />
          </p>

          <p>
            <span className="placeholder col-7" />
          </p>

          <p>
            <span className="placeholder col-5" />
          </p>

          <p>
            <span className="placeholder col-8" />
          </p>

          <div className="mt-4">
            <span className="placeholder col-12 py-3 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCardSkeleton;