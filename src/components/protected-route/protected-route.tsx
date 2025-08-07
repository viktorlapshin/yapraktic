import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authStatusSelector } from "../../services/reducers/auth-slice";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authStatus = useSelector(authStatusSelector);

  if (authStatus === "rejected") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
