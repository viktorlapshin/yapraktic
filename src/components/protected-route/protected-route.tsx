import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authStatusSelector } from "../../services/reducers/auth-slice";
import { useAppSelector } from "@/services/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authStatus = useAppSelector(authStatusSelector);

  if (authStatus === "rejected") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
