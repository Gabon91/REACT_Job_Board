import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SavedJobs from "../pages/SavedJobs";
import MyJobs from "../pages/MyJobs";
import CreateJob from "../pages/CreateJob";
import EditJob from "../pages/EditJob";
import About from "../pages/About";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/about" element={<About />} />
      {/* Guests Only */}
      <Route path="/login" element={<ProtectedRoute guestOnly><Login /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute guestOnly><Register /></ProtectedRoute>} />
      {/* Logged-in Users' Routes */}
      <Route path="/profile" element={<ProtectedRoute requireAuth><Profile /></ProtectedRoute>} />
      <Route path="/saved-jobs" element={<ProtectedRoute requireAuth><SavedJobs /></ProtectedRoute>} />
      {/* Recruiter Routes */}
      <Route path="/my-jobs" element={<ProtectedRoute requireRecruiter><MyJobs /></ProtectedRoute>} />
      <Route path="/jobs/create" element={<ProtectedRoute requireRecruiter><CreateJob /></ProtectedRoute>} />
      {/* recruiter and admin protection route. Ownership will be checked when we implement editing */}
      <Route path="/jobs/edit/:id" element={<ProtectedRoute requireAuth><EditJob /></ProtectedRoute>} />
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;