import { Navigate } from "react-router-dom";
import { TOKEN_NAME } from "../src/shared/constants";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(TOKEN_NAME);

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
