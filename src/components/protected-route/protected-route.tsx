import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authStatusSelector } from "../../services/reducers/auth-slice";

export const ProtectedRoute = ({ children }) => {
  const authStatus = useSelector(authStatusSelector);

  if (authStatus === "rejected") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
