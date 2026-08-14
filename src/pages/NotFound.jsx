import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <main className="container py-5">
      <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "65vh" }}>
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-3"> Page Not Found </h2>

        <p className="text-muted mb-4">
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <Link to="/" className="btn btn-primary">
          <FaHome className="me-2" /> Back to Home </Link>
      </div>
    </main>
  );
}

export default NotFound;