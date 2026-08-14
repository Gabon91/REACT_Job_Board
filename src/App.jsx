import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { useTheme } from "./contexts/ThemeContext";
function App() {
  const { isDarkMode } = useTheme();
  return (
    <>
      <Navbar />

      <AppRoutes />

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
    </>
  );
}

export default App;