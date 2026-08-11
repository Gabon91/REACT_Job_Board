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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route path="/my-jobs" element={<MyJobs />} />
      <Route path="/jobs/create" element={<CreateJob />} />
      <Route path="/jobs/edit/:id" element={<EditJob />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;