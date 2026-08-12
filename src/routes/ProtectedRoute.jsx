import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({
  children,
  requireAuth = false,
  requireRecruiter = false,
  requireAdmin = false,
  guestOnly = false,
}) {
  const {
    isAuthenticated,
    isRecruiter,
    isAdmin,
  } = useAuth();

  // Login/Register - guests only
  if (guestOnly && isAuthenticated) 
    return <Navigate to="/" replace />;
  
  // User must be logged in
  if ((requireAuth || requireRecruiter || requireAdmin) && !isAuthenticated) 
    return <Navigate to="/login" replace />;

  // Recruiter only
  if (requireRecruiter && !isRecruiter)
    return <Navigate to="/" replace />;

  // Admin only
  if (requireAdmin && !isAdmin)
    return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;