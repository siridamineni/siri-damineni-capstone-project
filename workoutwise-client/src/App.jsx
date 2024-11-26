import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ExploreWorkouts from "./pages/ExploreWorkouts/ExploreWorkouts";
import DailyTracker from "./pages/DailyTracker/DailyTracker";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-tracker"
          element={
            <ProtectedRoute>
              <DailyTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore-workouts"
          element={
            <ProtectedRoute>
              <ExploreWorkouts />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
