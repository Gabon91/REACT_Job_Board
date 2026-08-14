function Pagination({currentPage, totalPages, onPageChange}) {
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();
  return (
    <nav className="d-flex justify-content-center mt-5" aria-label="Jobs pagination">
      <ul className="pagination flex-wrap justify-content-center">
        <li
          className={`page-item ${
            currentPage === 1
              ? "disabled"
              : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
            <span className="d-none d-sm-inline ms-1"> Previous </span>
          </button>
        </li>

        {visiblePages.map((page) => (
          <li
            key={page}
            className={`page-item ${
              currentPage === page
                ? "active"
                : ""
            }`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}> {page} </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages
              ? "disabled"
              : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            <span className="d-none d-sm-inline me-1"> Next </span>
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;