function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }
  const pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  return (
    <nav className="d-flex justify-content-center mt-5" aria-label="Jobs pagination">
      <ul className="pagination flex-wrap">
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <button className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${
              currentPage === page ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;