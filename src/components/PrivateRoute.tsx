import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export const ProtectedRoute = ({
  children,
  roles,
}: {
  children: any;
  roles?: string[];
}) => {
  const { isAuthenticated, user } = useAuth() as any;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }
  return <>{children}</>;
};
