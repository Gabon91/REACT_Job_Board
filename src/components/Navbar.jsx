import {Link, NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const {isAuthenticated, isRecruiter, isAdmin, logout} = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) => `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/"> Job Board </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={getNavLinkClass}> Home </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className={getNavLinkClass}> About </NavLink>
            </li>

            {/* Logged-in user */}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/saved-jobs" className={getNavLinkClass}> Saved Jobs </NavLink>
              </li>
            )}

            {/* Recruiter */}
            {isRecruiter && (
              <>
                <li className="nav-item">
                  <NavLink to="/my-jobs" className={getNavLinkClass}> My Jobs </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/jobs/create" className={getNavLinkClass}> Create Job </NavLink>
                </li>
              </>
            )}

            {/* Admin */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink to="/admin" className={getNavLinkClass}> Admin </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className={getNavLinkClass}> Login </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/register" className={getNavLinkClass}> Register </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/profile" className={getNavLinkClass}> Profile </NavLink>
                </li>
                <li className="nav-item ms-lg-2">
                  <button type="button" className="btn btn-outline-light" onClick={handleLogout} > Logout </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;