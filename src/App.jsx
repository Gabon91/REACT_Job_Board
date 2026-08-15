import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTheme } from "./contexts/ThemeContext";
function App() {
  const { isDarkMode } = useTheme();
  return (
  <div className="min-vh-100 d-flex flex-column">
    <Navbar />
    <div className="flex-grow-1">
      <AppRoutes />
      </div>
      <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme={isDarkMode ? "dark" : "light"}
        />
    </div>
  );
}

export default App;