import { Navigate } from "react-router-dom";
import { TOKEN_NAME } from "../src/shared/constants";
const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem(TOKEN_NAME); // Check if token exists

  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
